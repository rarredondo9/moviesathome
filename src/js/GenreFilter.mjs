// Fills the genre dropdown and reports which genre the user pick
export default class GenreFilter { 
    constructor(mediaType, selectElement, services, onChange) {
        this.mediaType = mediaType;
        this.selectElement = selectElement;
        this.services = services;
        // Callback that runs with the chosen genre
        this.onChange = onChange;
    }

        // Loads the genres and starts listening to the selection
    async init() {
        await this.loadGenres();

        this.selectElement.addEventListener('change', () => {
            this.onChange(this.selectElement.value);
        });
    }
    //Empties the dropdown and refills the current type
    async loadGenres() {
        while (this.selectElement.options.length > 1) {
            this.selectElement.remove(1);
        }
        this.selectElement.value = '';

        try {
            const genres = await this.services.getGenres(this.mediaType);
            genres.forEach((genre) => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                this.selectElement.appendChild(option);
            });
        } catch (error) {
            // the dropdown still works with only "All genres" if this fails
            console.error('Could not load genres:', error.message);
        }
    }

    // Switches between Movies and TV shows
    async setMediaType(mediaType) {
        this.mediaType = mediaType;
        await this.loadGenres();
    }
}