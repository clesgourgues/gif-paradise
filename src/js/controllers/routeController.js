export default {

    getRoute() {
        let route = window.location.pathname;
        return route;
    },

    setRoute(search) {
        history.pushState(search, null, `?q=${search}`);
        window.location = `/?q=${search}`;
    },

    resetSearch() {
        history.pushState(null, null, '/');
        window.location = '/';
    }

}