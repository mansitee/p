 const shoppingData = [
            {
                id: "UiR6-kzyfH8",
                link: "#"
            },
            {
                id: "9Z7jFHrk8Hk",
                link: "#"
            },
            {
                id: "X-G2_IRzH2o",
                link: "#"
            }, 
            {
                id: "Bo8tCRRp5EI",
                link: "#"
            },{
                id: "x-aHM2RcL6k",
                link: "#"
            }, 
            {
                id: "ir8UGPUn1hs",
                link: "#"
            },{
                id: "vM9cnp_JDIA",
                link: "#"
            },
            {
                id: "_25DTNEFue4",
                link: "#"
            },        
             {
                id: "mV4-KkNK7gg",
                link: "#"
            },
            {
                id: "RlvZlh_GVw4",
                link: "#"
            },
            {
                id: "W_8mBam6fJc",
                link: "test.html?q={id}"
            },{
                id: "aTtSBMOpCR8",
                link: "test.html?q={id}"
            },{
                id: "RS3IviDEdGc",
                link: "#"
            },{
                id: "cNmc0PmvxAw",
                link: "#"
            },{
                id: "8tg6yjnDul0",
                link: "#"
            },
            {
                id: "wu0srWaayt4",
                link: "#"
            },
            {
                id: "0bps6RiVyN0",
                link: "#"
            },
            {
                id: "9x7PhNC047Q",
                link: "#"
            },{
                id: "E89ZagZdwEE",
                link: "#"
            },{
                id: "DbJpWaKsrJ8",
                link: "#"
            },
            {
                id: "PdHwq8W0dr8",
                link: "#"
            },
            {
                id: "u64eVPS7IMA",
                link: "#"
            },{
                id: "E89ZagZdwEE",
                link: "#"
            },
            {
                id: "PdHwq8W0dr8",
                link: "#"
            },
            {
                id: "dHPojWhaXDc",
                link: "#"
            },{
                id: "ulGz_10_HAE",
                link: "#"
            },
            {
                id: "n1TV1gORcc0",
                link: "#"
            },
            {
                id: "u64eVPS7IMA",
                link: "#"
            },
        ];

        function loadShoppingCards(data) {
            const shoppingContainer = document.getElementById('feed-id');
            data.forEach(item => {
                const card = document.createElement('a');
                card.className = 'feed-card';
                card.href = item.link;

                // Add click event listener to the card
                card.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior
                    fetchYouTubeInfo(item.id); // Fetch YouTube info based on the video ID
                });

                card.innerHTML = `
                    <img src="https://i.ytimg.com/vi/${item.id}/hqdefault.jpg" alt="${item.id}"width="100%" height="auto"loading="lazy"alt="${item.id}/ytinfo">
                `;
                shoppingContainer.appendChild(card);
            });
        }

        function fetchYouTubeInfo(videoId) {
            const ytInfoURL = 'https://ytinfo.vercel.app/get?video=' + videoId;

            fetch(ytInfoURL)
                .then(response => response.json())
                .then(data => {
                    displayVideoDetail(data); // Display video detail below the shopping container
                })
                .catch(error => {
                    alert('Sepertinya Ada Masalah Sambungan Ke YouTube Atau Jaringan Bermasalah, Coba Periksa Akses Internet Kamu, 🔃  ' + error);
                });
        }

        function displayVideoDetail(videoData) {
            const videoDetailContainer = document.getElementById('video-detail');
            videoDetailContainer.innerHTML = ''; // Clear previous content

            const thumbnail = document.createElement('img');
            thumbnail.src = videoData.videoDetails.thumbnails[0].url;
            thumbnail.alt = videoData.videoDetails.title;
            thumbnail.classList.add('video-thumbnail');
            videoDetailContainer.appendChild(thumbnail);

            const title = document.createElement('h3');
            title.textContent = videoData.videoDetails.title;
            title.classList.add('video-title');
            videoDetailContainer.appendChild(title);

            
            
            
            
            const description = document.createElement('div');
            description.classList.add('video-description');
            const descriptionTitle = document.createElement('h4');
            descriptionTitle.textContent = 'Deskripsi:';
            description.appendChild(descriptionTitle);

            // Split description text into paragraphs if there are multiple links
            const paragraphs = videoData.videoDetails.description.split('\n');
            paragraphs.forEach(paragraph => {
                const p = document.createElement('p');
                const linksRegex = /(?:https?|ftp):\/\/[\n\S]+/g;
                const links = paragraph.match(linksRegex);

                if (links && links.length > 0) {
                    const textWithoutLinks = paragraph.replace(linksRegex, '');
                    p.textContent = textWithoutLinks;

                    links.forEach(link => {
                        const a = document.createElement('a');
                        a.href = link;
                        a.textContent = link;
                        a.target = '_blank';
                        a.rel = 'noopener noreferrer';
                        const br = document.createElement('br');
                        description.appendChild(br);
                        description.appendChild(a);
                    });
                } else {
                    p.textContent = paragraph;
                }

                description.appendChild(p);
            });

            videoDetailContainer.appendChild(description);

            // Add download link and format info if available
if (videoData.formats && videoData.formats.length > 0) {
                const formatsContainer = document.createElement('div');
                formatsContainer.classList.add('formats-box');
                videoData.formats.forEach(format => {
                    const cardItem = document.createElement('div');
                    cardItem.classList.add('card-item');

                    const itemLabel = document.createElement('div');
                    itemLabel.textContent = `${format.container}, ${format.qualityLabel || format.audioQuality || 'Unknown Quality'}`;
                    itemLabel.classList.add('item-label');
                    cardItem.appendChild(itemLabel);

                    const downloadLink = document.createElement('a');
                    downloadLink.href = format.url;
                    downloadLink.textContent = 'Download';
                    downloadLink.setAttribute('download', '');
                    cardItem.appendChild(downloadLink);

                    formatsContainer.appendChild(cardItem);
                });
                videoDetailContainer.appendChild(formatsContainer);
            }

            // Show the video detail container
            videoDetailContainer.style.display = 'block';
        }

        // Load the shopping cards
        loadShoppingCards(shoppingData);

        document.getElementById('fetchButton').addEventListener('click', function () {
            var urlInput = document.getElementById('urlInput').value;
            var videoId = new URL(urlInput).searchParams.get('v');

            if (!videoId) {
                alert('Please enter a valid YouTube video URL.');
                return;
            }

            fetchYouTubeInfo(videoId);
        });
        
 // Otomatis tampilkan data saat URL ditempelkan atau diketik
document.getElementById('urlInput').addEventListener('input', function () {
    var urlInput = document.getElementById('urlInput').value;
    var videoId = new URL(urlInput).searchParams.get('v');

    if (videoId) {
        fetchYouTubeInfo(videoId);
    }
});       
        
