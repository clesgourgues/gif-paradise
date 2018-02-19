export default {

    getRoute() {
        let route = window.location.pathname;
        return route;
    },

    setRoute(search) {
        history.pushState(search, null, `?q=${search}`);
    },

    resetSearch(form, button, input) {
        form.reset();
        button.style.visibility = "hidden";
        input.focus();
        history.pushState(null, null, '/');
        window.location = '/';
    }

}