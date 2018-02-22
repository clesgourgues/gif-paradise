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
        })

        on(this.deleteBtn, "click", e => {
            this.searchForm.reset();
            this.deleteBtn.style.visibility = "hidden";
            this.searchInput.focus();
            router.resetRoute();
        })

        on(window, 'onpopstate', e => {
            console.log("location: " + document.location + ", state: " + JSON.stringify(e.state));
            // nav(route,search)
        })

        on(this.searchInput, "keydown", e => {
            this.deleteBtn.style.visibility = "visible";
        })

    };

    nav(route, search) {
        if (route === '/favourites') {
            document.getElementById('favourites-icon').classList.add("favourite");
            app.getfavouriteGifs();
        } else if (search.length > 3 && route === '/') {
            console.log ('serach ', search)
            const searchTerm = search.split('=')[1];
            this.searchInput.value = searchTerm;
            this.deleteBtn.style.visibility = "visible";
            app.getGifs(searchTerm);
        } else if(search.length === 3) {
            this.message('<p>Please enter something !</p>');
        } else {
            this.message('<p>Type your search, we will find gif stuff for you !</p>');
        }
    }

    message(string) {
        document.getElementById('message').innerHTML = string;
    }

    listen() {
        const gifs = Array.from(document.querySelectorAll("ul li div i"));
        gifs.forEach(gif => {
            on(gif, 'click', e => {
                let route = router.getRoute();
                let isFavourite = e.srcElement.classList[2] === "favourite"
                let obj = {}
                obj.url = e.path[2].firstElementChild.currentSrc
                obj.title = e.path[2].firstElementChild.alt
                obj.id = e.path[2].dataset.id
                if (!isFavourite) {
                    obj.favourite = true
                    gif.classList.add("favourite");
                    let favouritemessage = document.getElementById(obj.id);
                    favouritemessage.classList.remove("favourite-message");
                    app.saveGif(obj);
                } else {
                    gif.classList.remove("favourite");
                    app.deleteGif(obj)
                    if (route === '/favourites') {
                        app.getfavouriteGifs();
                    } else {
                        let favouritemessage = document.getElementById(obj.id);
                        favouritemessage.classList.add("favourite-message");
                    }
                }
            });
        });
    };

    render(results) {
        let route = router.getRoute();
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
                <p id="${gif.id}" class="favourite ${!gif.favourite || route == '/favourites' ? 'favourite-message' : ''}"><a href="/favourites">One of your favourites !</a></p>
            </div>
        </li>
        `;
            });
            output += `</ul>${route == '/favourites' ?'<a id="back">Back to your search</a>':''}`
            document.getElementById('results').innerHTML = output;

        }
    };
};
