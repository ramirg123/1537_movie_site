let currentPage = 1;

function fetchYTS(searchQuery = "") {
  if (currentPage === 1) main.innerHTML = "";

  fetch(`https://movies-api.accel.li/api/v2/list_movies.json?genre=animation&sort_by=rating&query_term=${searchQuery}&page=${currentPage}`)
    .then((results) => { return results.json() })
    .then((results) => {
      console.log(results);

      if (results.data.movies) {
        noMore.classList.add("hidden");
        loadMoreBtn.classList.remove("hidden")
      } else {
        noMore.classList.remove("hidden");
        loadMoreBtn.classList.add("hidden")
      }

      for (const element of results.data.movies) {
        const movieElement = document.createElement('div')
        movieElement.innerHTML = `
        <img src="${element.medium_cover_image}" class="mx-auto">
        ${element.title}
        ${element.year}
        <p class="absolute top-3 left-12
         bg-white border-2 rounded-sm px-2">${element.rating}</p>
        `
        main.appendChild(movieElement)

        movieElement.classList.add("basis-[30%]")
        movieElement.classList.add("text-center")
        movieElement.classList.add("relative")
        // create a div, fill it with poster + centered rating badge + title/year
        // append it to #main
      }
    })
    .catch((err) => console.log(err));
}

fetchYTS();

loadMoreBtn.addEventListener("click", () => {
  currentPage++, fetchYTS(inp1.value)
});

inp1.addEventListener("change", () => {
  currentPage = 1;
  fetchYTS(inp1.value);
});