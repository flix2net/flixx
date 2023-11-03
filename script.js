<script>
  const apiKey = "683265ee537211df26d8125e4759ea32";

  // Function to handle form submission
  function searchMoviesAndShows() {
    const query = document.getElementById("search-input").value;

    // Make a request to search movies and shows using the TMDB API
    fetch(https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query})
      .then(response => response.json())
      .then(data => {
        // Clear previous search results
        const tableBody = document.getElementById("results-table-body");
        tableBody.innerHTML = "";

        // Loop through the search results and add rows to the table
        data.results.forEach(result => {
          const row = document.createElement("tr");

          // Add image and title columns
          const imageColumn = document.createElement("td");
          const image = document.createElement("img");
          image.src = https://image.tmdb.org/t/p/w200${result.poster_path};
          imageColumn.appendChild(image);
          row.appendChild(imageColumn);

          const titleColumn = document.createElement("td");
          titleColumn.textContent = result.title || result.name;
          row.appendChild(titleColumn);

          // Add watch column with iframe based on TMDB ID
          const watchColumn = document.createElement("td");
          const watchLink = document.createElement("a");
          watchLink.href = https://autoembed.to/${result.media_type === "movie" ? "movie" : "tv"}/tmdb/${result.id};
          watchLink.target = "_blank";
          watchLink.textContent = "Watch";
          watchColumn.appendChild(watchLink);
          row.appendChild(watchColumn);

          // Add row to the table
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error(error));
  }
</script>