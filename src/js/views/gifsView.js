import app from '../app';

export default class GifsView {

    init() {
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const deleteBtn = document.getElementById('delete-btn');

        if (window.location.search === '' && window.location.pathname === '/') {
            searchForm.addEventListener("submit", e => {
                e.preventDefault();
                const searchTerm = e.target[1].value;
                app.getGifs(searchTerm);
                history.pushState(searchTerm, '', `?q=${searchTerm}`);
                this.render(output);
            })
        } else {
            const searchTerm = window.location.search.split('=')[1];
            searchInput.value = searchTerm;
            deleteBtn.style.visibility = "visible";
            app.getGifs(searchTerm);
        }

        deleteBtn.addEventListener("click", e => {
            searchInput.value = '';
            deleteBtn.style.visibility = "hidden";
            history.pushState(null, null, '/');
        })

        searchInput.addEventListener("keydown", e => {
            deleteBtn.style.visibility = "visible";
        })

    };

    render(output) {
        document.getElementById('results').innerHTML = output;
    };
};
