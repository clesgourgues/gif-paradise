const setLocalStorage = (state, item) => {
    const localStorage = window.localStorage;
    const serializedState = JSON.stringify(item)
    localStorage.setItem(state, serializedState);
};

export default setLocalStorage
