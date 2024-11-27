const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '190c168198msheee23856c000c8dp167169jsnd16972fffdd8',
		'x-rapidapi-host': 'spotify23.p.rapidapi.com'
	}
};

// ======== fetching track ID================
async function searchTracks(){
    const query = document.getElementById("searchbar").value;
    const Searchurl = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=tracks`;

    try {
        const response = await fetch(Searchurl, options);
        const result = await response.json();

        if (result.tracks && result.tracks.items && result.tracks.items.length > 0) {
            const trackId = result.tracks.items[0].data.id;
            trackDetails(trackId);
        } else {
            document.getElementById("song-info").innerHTML = '<p>No tracks found.</p>';
        }
    } catch (error) {
        console.error(error);
    }
}

// ========== fetching track details==================
async function trackDetails(trackId){
    const url = `https://spotify23.p.rapidapi.com/tracks/?ids=${trackId}`;

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayTrack(result);
    } catch (error) {
        console.error(error);
    }
}

// ============= display tracks details ================
function displayTrack(result){
    const songInfo = document.getElementById("song-info");
    const cover = document.getElementById("coverArt");
    songInfo.innerHTML = '';
    console.log(result);

    if (result.tracks && result.tracks.length > 0) {
        const track = result.tracks[0];
        const trackDiv = document.createElement('div');
        cover.src = track.album.images[0].url;
        trackDiv.innerHTML = `
            <h2>${track.name}</h2>
            <h3>${track.artists[0].name}</h3>
            <audio controls id="audioBar">
                <source src="${track.preview_url}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        songInfo.appendChild(trackDiv);
    } else {
        songInfo.innerHTML = '<p>No tracks found.</p>';
    }
    console.log("working");
}

// ================

async function searchArtist(){
    const query = document.getElementById("searchArtist").value;
    const Searchurl = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=tracks`;
    const trackList = document.getElementById("song-info");
    trackList.innerText = '';

    try {
        const response = await fetch(Searchurl, options);
        const result = await response.json();
        console.log(result);

        const cover = document.getElementById("coverArt");
        cover.src = result.tracks.items[0].data.albumOfTrack.coverArt.sources[0].url;

        if (result.tracks && result.tracks.items && result.tracks.items.length > 0) {
            const artistDiv = document.createElement('div');
            displayList(result);
            artistDiv.innerHTML = `<h3>${result.tracks.items[0].data.artists.items[0].profile.name}</h3>`;
            trackList.appendChild(artistDiv);
        } else {
            trackList.innerHTML = '<p>No tracks found.</p>';
        }
    } catch (error) {
        console.error(error);
    }
}

function displayList(result){
    const artistList = document.getElementById("artistList");
    artistList.innerHTML = ''; 

    if (result.tracks && result.tracks.items && result.tracks.items.length > 0) {
        result.tracks.items.forEach(track => {
            const listItem = document.createElement('li');
            listItem.setAttribute("class","mylists");
            listItem.textContent = track.data.name;
            const trackid = track.data.id;
            
            listItem.onclick = function() {
                playTrack(trackid);
            };

            artistList.appendChild(listItem);
        });
    } else {
        artistList.innerHTML = '<p>No tracks found.</p>';
    }
}

async function playTrack(trackid) {
    const url = `https://spotify23.p.rapidapi.com/tracks/?ids=${trackid}`;

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayTrack(result);
    } catch (error) {
        console.error(error);
    }
}

(async function trendingTracks(){
    const url = 'https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=Pop%2CIndia';
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        displayTrending(result);
    } catch (error) {
        console.error(error);
    }
})()

function displayTrending(result) {
    const box = document.getElementById("trackBox");
    box.innerHTML = '';

    if (result.tracks && result.tracks.length > 0) {
        result.tracks.forEach(track => {
            const card = document.createElement("div");
            card.className = "track-card";

            card.innerHTML = `
                <img src="${track.album.images[0].url}" alt="Album Cover" class="trend-cover">
                <div class="track-info">
                    <h3>${track.name}</h3>
                    <p>${track.artists[0].name}</p>
                </div>
            `;

            card.onclick = function(){
                trackDetails(track.id);
            }

            box.appendChild(card);
        });
    } else {
        box.innerHTML = '<p>No trending tracks found.</p>';
    }
}

// ================


