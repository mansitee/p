
        function searchVideos() {
    const searchQuery = document.getElementById('search-input').value;
    const apiKey = 'AIzaSyDooaKG0vu4eWexLT-MlUVPpzXP8qqpfp4';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=150&q=${searchQuery}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayVideos(data.items);
        })
        .catch(error => console.error('Error:', error));
} 
function displayVideos(videos) {
    const playlistItems = document.getElementById('playlist-items');
    playlistItems.innerHTML = '';

    videos.forEach(video => {
        const title = video.snippet.title;
        const videoId = video.id.videoId;
        const thumbnailUrl = video.snippet.thumbnails.medium.url;
        const viewCount = video.statistics ? video.statistics.viewCount : 'N/A'; // Pastikan viewCount tersedia

        const listItem = document.createElement('li');
        listItem.classList.add('video-item');

        const thumbnail = document.createElement('img');
        thumbnail.src = thumbnailUrl;
        thumbnail.alt = title;
        thumbnail.classList.add('thumbnail');
        listItem.appendChild(thumbnail);

        const titleAndLinkContainer = document.createElement('div');
        titleAndLinkContainer.classList.add('title-and-link-container');

        const titleElement = document.createElement('div');
        titleElement.textContent = title;
        titleElement.classList.add('video-title');
        titleAndLinkContainer.appendChild(titleElement);
        // Copy link button
        const copyLinkButton = document.createElement('button');
        copyLinkButton.textContent = 'Salin Link';
        copyLinkButton.classList.add('copy-link-button');
        copyLinkButton.onclick = function() {
            copyVideoLink(videoId);
        };
        titleAndLinkContainer.appendChild(copyLinkButton);

        listItem.appendChild(titleAndLinkContainer);

        listItem.onclick = function() {
            playVideo(videoId);
        };

        playlistItems.appendChild(listItem);
    });
}



function playVideo(videoId) {
    const player = document.getElementById('player');
    player.src = `https://www.youtube.com/embed/${videoId}`;
}

function copyVideoLink(videoId) {
    const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
    navigator.clipboard.writeText(youtubeLink).then(() => {
        alert('Link Berhasil Di Salin!');
    }).catch(err => {
        console.error('Gagal Menyalin link: ', err);
    });
}  

