// Draws the watchlist page and handles Remove buttons
import { getPosterUrl, renderListWithTemplate, setStatus, escapeHtml } from './utils.mjs';

// Builds one saved card. The remove button sits outside the link so clicking it does not open the details page
function watchlistCardTemplate(item) {
    const title = escapeHtml(item.title);
    const poster = getPosterUrl(item.posterPath);
    const image = poster
    ? `<img src="${poster}" alt="Poster for ${title}" loading="lazy">`
    : '<div class="no-poster">No image</div>';

    return `<li class="movie-card" data-id="${item.id}" data-media-type="${item.mediaType}">
        <a href="/details.html?id=${item.id}&amp;type=${item.mediaType}" class="movie-card__link">
            ${image}
            <h3 class="movie-card__title">${title}</h3>
            </a>
            <button type="button" class="remove-button" aria-label="Remove ${title} from watchlist">Remove</button>
    </li>`;
}

export default class WatchlistPage {
    constructor(listElement, statusElement, watchlist) {
        this.listElement = listElement;
        this.statusElement = statusElement;
        this.watchlist = watchlist;
    }

    // Draws the saved titles and listens for Remove clicks
    init() {
        this.render();

        // One listener on the list handles every Remove button
        // The card's data attributes says which title to remove
        this.listElement.addEventListener('click', (event) => {
            const button = event.target.closest('.remove-button');
            if (!button) {
                return;
            }
            const card = button.closest('.movie-card');
            this.watchlist.remove(card.dataset.id, card.dataset.mediaType);
            this.render();
        });
    }

    // Shows the saved titles
    render () {
        const items = this.watchlist.getAll();

        if (items.length === 0) {
            this.listElement.innerHTML = '';
            setStatus(this.statusElement, 'Your watchlist is empty. Browse titles and add some!');
            return;
        }

        setStatus(this.statusElement);
        renderListWithTemplate(watchlistCardTemplate, this.listElement, items, 'beforeend', true);
    }
}