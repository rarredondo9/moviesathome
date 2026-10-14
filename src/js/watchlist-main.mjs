// Entry point for watchlist.html 
import Watchlist from "./Watchlist.mjs";
import WatchlistPage from "./WatchlistPage.mjs";
import { qs } from './utils.mjs';

// Connects the page to the saved list
const page = new WatchlistPage(qs('#watchlist'), qs('#status'), new Watchlist());

// Draws the saved titles and listens for Remove clicks
page.init();