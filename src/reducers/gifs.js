const gifs = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_GIFS_REQUEST':
            return state
        case 'FETCH_GIFS_SUCCESS':
            return {...state, gifs: action.payload}
/*         case 'FETCH_GIFS_ERROR':
            return state.map(t =>
                todo(t, action)
            ) */
        default:
            return state
    }
}

export default gifs