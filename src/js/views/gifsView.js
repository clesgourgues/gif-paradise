import app from '../app';
import router from '../controllers/routeController';
import { on } from '../helpers/events';

export default class GifsView {
    
    init() {
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const deleteBtn = document.getElementById('delete-btn');

        // how to render considering the route
        let route = router.getRoute();
        let search = window.location.search;

        if (route === 'favourites') {
            console.log('favourites')
        } else if (search.length > 0) {
            const searchTerm = search.split('=')[1];
            searchInput.value = searchTerm;
            deleteBtn.style.visibility = "visible";
            app.getGifs(searchTerm);
        } else {
            this.render('<p>pas de recherche en cours</p>');
        }

        // add event listeners that change routes
        on(searchForm, "submit", e => {
            e.preventDefault();
            const searchTerm = e.target[1].value;
            router.setRoute(searchTerm);
            this.init();
        })

        on(deleteBtn, "click", e => {
            router.resetSearch(searchForm, deleteBtn, searchInput);
            this.init();
        })

        on(searchInput, "keydown", e => {
            deleteBtn.style.visibility = "visible";
        })

    };

    render(output) {
        document.getElementById('results').innerHTML = output;
    };
};
