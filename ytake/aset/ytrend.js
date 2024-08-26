 // JavaScript for dynamic content
        document.addEventListener('DOMContentLoaded', function() {
            const videosSection = document.getElementById('videos');
            
            // Fetch data from YouTube Data API v3
            const apiKey = 'AIzaSyDFvvcF6DUkocUDiIeMODKL799RvrVmZDA';
            const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=100&regionCode=ID&key=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Process the data and create HTML for each video
                    data.items.forEach(item => {
                        const videoItem = document.createElement('div');
                        videoItem.classList.add('video-item');
                        videoItem.innerHTML = `
                            <h2>${item.snippet.title}</h2>
                            <a href="https://www.youtube.com/watch?v=${item.id}" target="_blank">
                                <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}">
                            </a>
                            <div class="channel-info">
                                <img src="${item.snippet.channelThumbnailUrl}" alt="${item.snippet.channelTitle} Avatar">
                                <span>${item.snippet.channelTitle}</span>
                            </div>
                            <div class="viewer-count">${formatNumber(item.statistics.viewCount)} views</div>
                            <button class="copy-link-btn" onclick="copyVideoLink('https://www.youtube.com/watch?v=${item.id}')">Salin Link</button>
                        `;
                        videosSection.appendChild(videoItem);

                        // Fetch channel details to get channel avatar
                        fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=${apiKey}`)
                            .then(response => response.json())
                            .then(channelData => {
                                const channelInfo = videoItem.querySelector('.channel-info');
                                if (channelData.items && channelData.items.length > 0) {
                                    const channelSnippet = channelData.items[0].snippet;
                                    const channelAvatar = channelSnippet.thumbnails.medium.url;
                                    channelInfo.innerHTML = `
                                        <img src="${channelAvatar}" alt="${channelSnippet.title} Avatar">
                                        <span>${channelSnippet.title}</span>
                                    `;
                                }
                            })
                            .catch(error => console.error('Error fetching channel data:', error));
                    });
                })
                .catch(error => console.error('Error fetching data from YouTube API:', error));

            // Function to copy video link to clipboard
            function copyVideoLink(url) {
                navigator.clipboard.writeText(url)
                    .then(() => alert('Link berhasil disalin!'))
                    .catch(err => console.error('Gagal menyalin link:', err));
            }

            // Function to format number with commas
            function formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }
        });
    