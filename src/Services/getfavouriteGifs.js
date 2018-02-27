 const getfavouriteGifs = (state) => {
    const localStorage = window.localStorage;
    return JSON.parse(localStorage.getItem(state) || '[]');
}

export default getfavouriteGifs;
