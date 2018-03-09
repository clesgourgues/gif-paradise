export const gifs = (state = {
    gifs: [],
    gifsIsLoading: false,
    gifsHasErrored: false
    }, action) => {
    switch (action.type) {
        case 'TOGGLE_GIF':
            return state.map(gif =>
                (gif.id === action.id)
                    ? { ...gif, favourite: !gif.favourite }
                    : gif)
        case 'FETCH_GIFS_REQUEST':
            return action.gifsIsLoading;

        case 'FETCH_GIFS_ERROR':
            return action.gifsHasErrored;

        case 'FETCH_GIFS_SUCCESS':
            return action.payload.data.map(gif => {
                let obj = {};
                obj.url = gif.images.original.url;
                obj.title = gif.title;
                obj.id = gif.id;
                obj.favourite = false// if the gif is in favourites, set favourite property to true
                return obj;
            })
        default:
            return state
    }
}

