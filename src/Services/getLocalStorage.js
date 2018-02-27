const getLocalStorage = (state) => {
    try {
        const serializedState = localStorage.getItem(state);
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      } catch (err) {
        return undefined;
      }
};

export default getLocalStorage;

