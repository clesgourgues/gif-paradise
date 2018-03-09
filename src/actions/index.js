
export const toggleGif = (id) => ({
  type: 'TOGGLE_GIF',
  id
})

export const fetchGifsWithRedux = (searchTerm) => {
	return (dispatch) => {
  	dispatch(fetchGifsLoading(true));
    return fetchGifs(searchTerm).then(([response, json]) =>{
    	if(response.status === 200){
        console.log(json)
      	dispatch(fetchGifsSuccess(json))
      }
      else{
      	dispatch(fetchGifsError(true))
      }
    })
  }
}

export const fetchGifs = (searchTerm) => {
  const URL = `https://api.giphy.com/v1/gifs/search?api_key=v2k68wqUjqUfJLvBHOXNu6i2fCZiqNV5&q=${searchTerm}&limit=25`;
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}


export const fetchGifsLoading = (bool) =>{
    return {
      type: "FETCH_GIFS_REQUEST",
      gifsIsLoading: bool
    }
  }
  
export const fetchGifsSuccess = (payload) => {
    return {
      type: "FETCH_GIFS_SUCCESS",
      payload
    }
  }
  
export const fetchGifsError = (bool) => {
    return {
      type: "FETCH_GIFS_ERROR",
      gifsHasErrored: bool
    }
  }
