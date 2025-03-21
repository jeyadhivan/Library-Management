let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchResults.textContent = "";
    spinnerEl.classList.remove("d-none"); // Show spinner
    let searchValue = searchInput.value.trim();

    fetch(`https://apis.ccbp.in/book-store?title=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        spinnerEl.classList.add("d-none"); // Hide spinner

        if (data.search_results.length === 0) {
          searchResults.innerHTML =
            '<p class="text-center text-danger">No results found</p>';
        } else {
          data.search_results.forEach(function (book) {
            let resultItem = document.createElement("div");
            resultItem.classList.add("result-item", "p-3", "text-center");

            let image = document.createElement("img");
            image.src = book.imageLink;
            image.alt = "Book Cover";
            image.classList.add("img-fluid", "mb-2");
            resultItem.appendChild(image);

            let author = document.createElement("p");
            author.textContent = book.author;
            resultItem.appendChild(author);

            searchResults.appendChild(resultItem);
          });
        }
      })
      .catch(() => {
        spinnerEl.classList.add("d-none"); // Hide spinner
        searchResults.innerHTML =
          '<p class="text-center text-danger">Failed to fetch results. Try again later.</p>';
      });
  }
});
