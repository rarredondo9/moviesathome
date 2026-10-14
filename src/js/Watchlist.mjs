// Saves and rads the watchlist in LocalStorage
const STORAGE_KEY = 'moviesathome-watchlist';

export default class Watchlist {
    // Returns the saved list; empty list if nothing is saved or the data is damaged
    getAll() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    }

    // True if this title is saved
    has(id, mediaType) {
        return this.getAll().some(
            (item) => String(item.id) === String(id) && item.mediaType === mediaType
        );
    }

    // Saves title unless it is already in the list
    add(entry) {
        if (this.has(entry.id, entry.mediaType)) {
            return;
        }
        const list = this.getAll();
        list.push(entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    // Removes title from the list
    remove(id, mediaType) {
        const list = this.getAll().filter(
            (item) => !(String(item.id) === String(id) && item.mediaType === mediaType)
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    // Adds the title if it is not saved, removes it if it is. 
    toggle(entry) {
        if (this.has(entry.id, entry.mediaType)) {
            this.remove(entry.id, entry.mediaType);
            return false;
        }
        this.add(entry);
        return true;
    }
}