
export const toggleGif = (id) => ({
  type: 'TOGGLE_GIF',
  id
})

export const fetchGifsWithRedux = (searchTerm) => {
	return (dispatch) => {
  	dispatch(fetchGifsRequest());
    return fetchGifs().then(([response, json]) =>{
    	if(response.status === 200){
      	dispatch(fetchGifsSuccess(json))
      }
      else{
      	dispatch(fetchGifsError())
      }
    })
  }
}

const fetchGifs = (searchTerm) => {
  const URL = `https://api.giphy.com/v1/gifs/search?api_key=v2k68wqUjqUfJLvBHOXNu6i2fCZiqNV5&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`;
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}


const fetchGifsRequest = () =>{
    return {
      type: "FETCH_GIFS_REQUEST"
    }
  }
  
const fetchGifsSuccess = (payload) => {
    return {
      type: "FETCH_GIFS_SUCCESS",
      payload
    }
  }
  
const fetchGifsError = () => {
    return {
      type: "FETCH_GIFS_ERROR"
    }
  }