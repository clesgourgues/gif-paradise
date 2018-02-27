const setLocalStorage = (state, item) => {
    const localStorage = window.localStorage;
    localStorage.setItem(state, item);
};

export default setLocalStorage
