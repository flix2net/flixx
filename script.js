const apiKey = "683265ee537211df26d8125e4759ea32";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");
const embedFrame = document.getElementById("embedFrame");

searchButton.addEventListener("click", () => {
    const searchQuery = searchInput.value;
    const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchQuery}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Clear previous search results
            searchResults.innerHTML = "";

            if (data.results && data.results.length > 0) {
                data.results.forEach((item) => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result-item");
                    resultItem.setAttribute("data-id", item.id);

                    const title = document.createElement("h3");
                    title.textContent = item.title || item.name;

                    // Add additional content information, such as poster, description, etc.

                    resultItem.appendChild(title);
                    searchResults.appendChild(resultItem);

                    // Listen for clicks on result items to show content in the iframe
                    resultItem.addEventListener("click", () => {
                        displayContentInIframe(item);
                    });
                });
            } else {
                searchResults.textContent = "No results found.";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            searchResults.textContent = "An error occurred while fetching data.";
        });
});

function displayContentInIframe(content) {
    // Make an API request to get more details about the selected content
    // Then, generate the URL for embedding and set it in the iframe
    // You can use the content type (movie or TV show) to construct the URL
    const detailApiUrl = `https://api.themoviedb.org/3/movie/${content.id}?api_key=${apiKey}`;

    fetch(detailApiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.videos && data.videos.results.length > 0) {
                const videoKey = data.videos.results[0].key;
                const embedUrl = `https://autoembed.to/movie/tmdb/${content.id}?server=2&video_key=${videoKey}`;
                embedFrame.src = embedUrl;
            }
        })
        .catch((error) => {
            console.error("Error fetching content details:", error);
        });
}
