export default {

    getRoute() {
        let route = window.location.pathname;
        return route;
    },

    setRoute(search) {
        history.pushState(search, null, `?q=${search}`);
        window.location.href = `/?q=${search}`;
    },

    resetRoute() {
        history.pushState(search, null, '/');
        window.location = '/';
    }
}