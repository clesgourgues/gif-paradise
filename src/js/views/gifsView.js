import app from '../app';
import router from '../controllers/routeController';
import { on } from '../helpers/events';

export default class GifsView {

    constructor() {
        this.searchForm = document.getElementById('search-form');
        this.searchInput = document.getElementById('search-input');
        this.deleteBtn = document.getElementById('delete-btn');
    };

    init() {
        let route = router.getRoute();
        let search = window.location.search;

        this.nav(route, search);

        on(this.searchForm, "submit", e => {
            e.preventDefault();
            const searchTerm = e.target[1].value;
            router.setRoute(searchTerm);
            this.init();
        })

        on(this.deleteBtn, "click", e => {
            this.searchForm.reset();
            this.deleteBtn.style.visibility = "hidden";
            this.searchInput.focus();
            router.resetSearch();
            this.init();
        })

        on(window, 'popstate', e => {
            console.log('coucou')
        })

        on(this.searchInput, "keydown", e => {
            this.deleteBtn.style.visibility = "visible";
        })

    };

    nav(route, search) {
        if (route === '/favourites') {
            app.getfavouriteGifs();
        } else if (search.length > 0) {
            const searchTerm = search.split('=')[1];
            this.searchInput.value = searchTerm;
            this.deleteBtn.style.visibility = "visible";
            app.getGifs(searchTerm);
        } else {
            this.message('<p>Type your search, we will find gif stuff for you !</p>');
        }
    }

    message(string) {
        document.getElementById('message').innerHTML = string;
    }

    listen() {
        const gifs = document.querySelectorAll("ul li div i");
        gifs.forEach(gif => {
            on(gif, 'click', e => {
                let isFavourite = e.srcElement.classList[2] === "favourite"
                let obj = {}
                obj.url = e.path[2].firstElementChild.currentSrc
                obj.title = e.path[2].firstElementChild.alt
                obj.id = e.path[2].dataset.id
                if (!isFavourite) {
                    obj.favourite = true
                    gif.classList.add("favourite");
                    app.saveGif(obj)
                } else {
                    gif.classList.remove("favourite");
                    app.deleteGif(obj)
                }
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
                <i class="fas fa-heart ${gif.favourite ? 'favourite' : ''} "></i>
            </div>
        </li>
        `;
            });
            output += '</ul>';
            document.getElementById('results').innerHTML = output;
        }
    };
};
