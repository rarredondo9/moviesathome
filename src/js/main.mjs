// Entry point for index.html
import ExternalServices from "./ExternalServices.mjs";
import MovieList from "./MovieList.mjs";
import GenreFilter from "./GenreFilter.mjs";
import Pager from "./Pager.mjs";
import { qs } from "./utils.mjs";

const services = new ExternalServices();
const searchInput = qs("#search-input");
const genreSelect = qs("#genre-select");

// The pager asks the list to load another page when the button is clicked
const pager = new Pager(qs("#pager"), (page) => movieList.goToPage(page));
const movieList = new MovieList(
  "movie",
  qs("#movie-list"),
  qs("#status"),
  services,
  pager,
);

// Show popular movies when the page loads
movieList.init();

// Fill the genre dropdown, picking a genre clears the search box
const genreFilter = new GenreFilter(
  "movie",
  genreSelect,
  services,
  (genreId) => {
    searchInput.value = "";
    movieList.init(genreId);
  },
);
genreFilter.init();

// Search by title
qs("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  genreSelect.value = "";

  if (query) {
    movieList.search(query);
  } else {
    movieList.init();
  }
});

// Clicking the site title resets the search and genre and shows the popular list
qs('#home-link').addEventListener('click', (event) => {
  event.preventDefault();
  searchInput.value = '';
  genreSelect.value = '';
  movieList.init();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Switching between Movies and TV shows
qs('#media-toggle').addEventListener('change', (event) => {
  const mediaType = event.target.value;
  searchInput.value = '';
  movieList.mediaType = mediaType;
  genreFilter.setMediaType(mediaType);
  movieList.init();
});