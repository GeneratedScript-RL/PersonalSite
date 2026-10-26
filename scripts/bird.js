document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.WelcomeDiv');
    const canvas = document.getElementById('birdCanvas');
    const ctx = canvas.getContext('2d');

    const mouse = {
        x: null,
        y: null,
        active: false
    };

    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        mouse.active = true;
    });

    container.addEventListener('mouseleave', (event) => {
        mouse.active = false;
    });

    class Vector {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        add(v) { this.x += v.x; this.y += v.y; return this; }
        sub(v) { this.x -= v.x; this.y -= v.y; return this; }
        mult(n) { this.x *= n; this.y *= n; return this; }
        div(n) { this.x /= n; this.y /= n; return this; }
        mag() { return Math.sqrt(this.x * this.x + this.y * this.y); }
        setMag(n) { return this.normalize().mult(n); }
        normalize() {
            let m = this.mag();
            if (m !== 0) this.div(m);
            return this;
        }
        limit(max) {
            if (this.mag() > max) this.setMag(max);
            return this;
        }
        static dist(v1, v2) {
            let dx = v1.x - v2.x;
            let dy = v1.y - v2.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    class Triangle {
        constructor(x, y) {
            this.position = new Vector(x, y);
            this.velocity = new Vector((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
            this.acceleration = new Vector();
            this.maxSpeed = 3.5;
            this.maxForce = 0.08;
            this.history = [];
            this.maxHistory = 15;
        }

        update() {
            this.history.push({ x: this.position.x, y: this.position.y });
            if (this.history.length > this.maxHistory) {
                this.history.shift();
            }

            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
            this.position.add(this.velocity);
            this.acceleration.mult(0);

            this.edges();
        }

        applyForce(force) {
            this.acceleration.add(force);
        }

        edges() {
            if (this.position.x > canvas.width) {
                this.position.x = 0;
                this.history = [];
            } else if (this.position.x < 0) {
                this.position.x = canvas.width;
                this.history = [];
            }
            if (this.position.y > canvas.height) {
                this.position.y = 0;
                this.history = [];
            } else if (this.position.y < 0) {
                this.position.y = canvas.height;
                this.history = [];
            }
        }

        seek(target) {
            let desired = new Vector(target.x - this.position.x, target.y - this.position.y);
            desired.setMag(this.maxSpeed);
            let steer = new Vector(desired.x - this.velocity.x, desired.y - this.velocity.y);
            steer.limit(this.maxForce * 1.5);
            return steer;
        }

        separate(boids) {
            let perceptionRadius = 25;
            let steering = new Vector();
            let total = 0;
            for (let other of boids) {
                let d = Vector.dist(this.position, other.position);
                if (other !== this && d < perceptionRadius) {
                    let diff = new Vector(this.position.x - other.position.x, this.position.y - other.position.y);
                    diff.div(d * d);
                    steering.add(diff);
                    total++;
                }
            }
            if (total > 0) {
                steering.div(total);
                steering.setMag(this.maxSpeed);
                steering.sub(this.velocity);
                steering.limit(this.maxForce);
            }
            return steering;
        }

        align(boids) {
            let perceptionRadius = 50;
            let steering = new Vector();
            let total = 0;
            for (let other of boids) {
                let d = Vector.dist(this.position, other.position);
                if (other !== this && d < perceptionRadius) {
                    steering.add(other.velocity);
                    total++;
                }
            }
            if (total > 0) {
                steering.div(total);
                steering.setMag(this.maxSpeed);
                steering.sub(this.velocity);
                steering.limit(this.maxForce);
            }
            return steering;
        }

        cohere(boids) {
            let perceptionRadius = 50;
            let steering = new Vector();
            let total = 0;
            for (let other of boids) {
                let d = Vector.dist(this.position, other.position);
                if (other !== this && d < perceptionRadius) {
                    steering.add(other.position);
                    total++;
                }
            }
            if (total > 0) {
                steering.div(total);
                return this.seek(steering);
            }
            return steering;
        }

        flock(boids) {
            let separation = this.separate(boids);
            let alignment = this.align(boids);
            let cohesion = this.cohere(boids);

            separation.mult(1.5);
            alignment.mult(1.0);
            cohesion.mult(1.0);

            this.applyForce(separation);
            this.applyForce(alignment);
            this.applyForce(cohesion);

            if (mouse.active) {
                const d = Vector.dist(this.position, mouse);
                if (d > 60) {                       // dead zone around the cursor
                    const pull = this.seek(mouse);
                    pull.mult(0.6 * Math.min(1, d / 200)); // weaker as they get close
                    this.applyForce(pull);
                }
            }
        }

        draw() {
            if (this.history.length > 1) {
                ctx.beginPath();
                ctx.moveTo(this.history[0].x, this.history[0].y);
                for (let i = 1; i < this.history.length; i++) {
                    ctx.lineTo(this.history[i].x, this.history[i].y);
                }
                ctx.lineTo(this.position.x, this.position.y);
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            let angle = Math.atan2(this.velocity.y, this.velocity.x);
            let size = 6;

            ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(size * 2, 0);
            ctx.lineTo(-size, -size);
            ctx.lineTo(-size / 2, 0);
            ctx.lineTo(-size, size);
            ctx.closePath();

            ctx.fillStyle = '#38bdf8';
            ctx.fill();

            ctx.restore();
        }
    }

    const boids = [];
    const NUM_BOIDS = 60;

    for (let i = 0; i < NUM_BOIDS; i++) {
        boids.push(new Triangle(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    // Main Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let boid of boids) {
            boid.flock(boids);
            boid.update();
            boid.draw();
        }

        requestAnimationFrame(animate);
    }

    animate();
})