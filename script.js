const apiKey = '683265ee537211df26d8125e4759ea32';
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultsTable = document.getElementById('results-table');
const iframe = document.getElementById('iframe');

searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  searchMoviesAndShows(query);
});

function searchMoviesAndShows(query) {
  // Make an API request to TMDb to search for movies and TV shows.
  // Handle the results and display them in the table.
  // Use the provided iframe URLs to play the selected content.
}

function displayResults(results) {
  // Clear previous results
  resultsTable.innerHTML = '';

  // Loop through the results and add them to the table
  results.forEach((result) => {
    const row = resultsTable.insertRow();
    const titleCell = row.insertCell(0);
    const posterCell = row.insertCell(1);
    const actionCell = row.insertCell(2);

    titleCell.textContent = result.title;
    posterCell.innerHTML = `<img src="https://image.tmdb.org/t/p/w185/${result.poster_path}" alt="${result.title} Poster">`;

    // Create a button to play the content in the iframe
    const playButton = document.createElement('button');
    playButton.textContent = 'Watch';
    playButton.addEventListener('click', () => {
      // Set the iframe source to the selected movie or TV show
      iframe.src = getIframeURL(result);
      iframe.style.display = 'block';
    });

    actionCell.appendChild(playButton);
  });
}

function getIframeURL(result) {
  if (result.media_type === 'movie') {
    return `https://autoembed.to/movie/tmdb/${result.id}`;
  } else if (result.media_type === 'tv') {
    // You can prompt the user to select season and episode here
    const season = prompt('Enter Season Number:');
    const episode = prompt('Enter Episode Number:');
    return `https://autoembed.to/tv/tmdb/${result.id}-${season}-${episode}`;
  }
}
