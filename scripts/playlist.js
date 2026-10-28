const Playlist1 = document.getElementById("Playlist1")
const Playlist2 = document.getElementById("Playlist2")
const Playlist3 = document.getElementById("Playlist3")

const playlistElements = {
    Playlist1: Playlist1,
    Playlist2: Playlist2,
    Playlist3: Playlist3,
}

const SongLinks = {
    "Playlist1": [
        "https://open.spotify.com/track/6EO56btPzDF3LUrfwlXi2j"
    ],
    "Playlist2": [

    ],
    "Playlist3": [

    ],
}

const Songs = {
    "Playlist1": {

    },
    "Playlist2": {

    },
    "Playlist3": {

    },
}

async function loadSongs() {
    for (const playlist in SongLinks) {
        for (const SongLink of SongLinks[playlist]) {
            try {
                const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(SongLink)}`);
                const data = await res.json();

                Songs[playlist][data.title] = {
                    name: data.title,
                    image: data.thumbnail_url
                }
            } catch(err) {
                console.error(`Failed: ${SongLink}`, err);
            }
        }
    }

    for (const playlistName in Songs) {
        for (const Song in Songs[playlistName]) {
            const SongObject = Songs[playlistName][Song]
            let SongElement = document.createElement("div");
            SongElement.classList.add("Song")

            let songImg = document.createElement("img");
            songImg.src = SongObject.image;
            SongElement.appendChild(songImg);

            let Title = document.createElement("p");
            Title.textContent = SongObject.name
            SongElement.appendChild(Title)

            playlistElements[playlistName].appendChild(SongElement);
        }
    }
}

loadSongs();