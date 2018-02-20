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
        console.log('route :', route)
        let search = window.location.search;

        if (route === '/favourites') {
            app.getfavouriteGifs();
        } else if (search.length > 0) {
            const searchTerm = search.split('=')[1];
            searchInput.value = searchTerm;
            deleteBtn.style.visibility = "visible";
            app.getGifs(searchTerm);
        } else {
            this.message('<p>pas de recherche en cours</p>');
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

    message(string) {
        document.getElementById('message').innerHTML = string;
    }

    listen() {
        const gifs = document.querySelectorAll("ul li div i");
        gifs.forEach(gif => {
            on(gif, 'click', e => {
                //class favourite true ? alors on remove
                let obj = {}
                obj.url = e.path[2].firstElementChild.currentSrc
                obj.title = e.path[2].firstElementChild.alt
                obj.id = e.path[2].dataset.id
                obj.favourite = true
                console.log(obj)
                app.saveGif(obj)
            });
        });
    };

    render(results) {
        if (typeof results === "string") {
            document.getElementById('results').innerHTML = results;
        } else {
            let output = `<ul id="grid" class="card-container">`;
            results.forEach(gif => {
                output += `
        <li class="card" data-id="${gif.id}">
            <img src="${gif.url}" alt="${gif.title}">
            <div class="card-body">
                <p>${gif.title}</p>
                <i class="far fa-heart ${gif.favourite ? 'favourite' : ''} "></i>
            </div>
        </li>
        `;
            });
            output += '</ul>';
            document.getElementById('results').innerHTML = output;
        }
    };
};
