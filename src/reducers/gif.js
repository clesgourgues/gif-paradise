 const gif = (state={} , action) => {
    switch (action.type) {
        case 'TOGGLE_GIF':
            if (state.id !== action.id) {
                return state
            }
            return {
                ...state,
                favourite: !gif.favourite
            }
        default:
            return state
    }
}

export default gif