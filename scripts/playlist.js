const playlistElements = {
    Playlist1: document.getElementById("Playlist1"),
    Playlist2: document.getElementById("Playlist2"),
    Playlist3: document.getElementById("Playlist3"),
}

const SongLinks = {
    Playlist1: ["6EO56btPzDF3LUrfwlXi2j", "68SKsdLA8I9tOGJV5qLuJj", "1O80Lhuq0lKHIiF1HnMgQT", "5EfvD1jdbDYQ6OEuQGkweb", "0Oz6SCNjnsfEAWI3Y9Ix7f", "0AKhYv7yWzpxgZR8r531lt", "35mnYQhTJAbJiOka71OvQJ"],
    Playlist2: ["25vvfOwx0tw2N44SMk1cMC", "4vQxoBgjkODJbFyzOdYLfw", "6RvyoAzwuqmrCqhM8MwPjP", "6CSIdDuci7J7NH1lbFMuob", "6C3NjslaxrAHpiU9W5XTiV", "2Pg7QBO36ycIlNcK9aBJl0", "4FDr0iOEB8lEDgpvCvEYWi"],
    Playlist3: ["7ETSUd74fhHvG2JldNVizV", "0RtYfzwkgj0sOBuZc3NmSK", "7zYtn0U2yDdLPQfc2Jct9F", "2G5iUlHUHT28DauclHioat", "6oh6pyBUaJWZbhQKsq0iAm", "0MemW1DmggDpHBGH4GgiaS", "4iHYQwgtrY26p2uQG8Nstr"],
}

async function loadSongs() {
    for (const playlistName in SongLinks) {
        for (const trackId of SongLinks[playlistName]) {
            try {
                const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/track/${trackId}`)}`);
                const data = await res.json();

                const SongElement = document.createElement("div");
                SongElement.classList.add("Song");
                SongElement.innerHTML = `<img src="${data.thumbnail_url}"><p>${data.title}</p>`;
                playlistElements[playlistName].appendChild(SongElement);
            } catch (err) {
                console.error(`Failed: ${trackId}`, err);
            }
        }
    }
}

loadSongs();