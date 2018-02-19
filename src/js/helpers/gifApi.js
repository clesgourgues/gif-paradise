export default {
  
  search(searchTerm) {
    return fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=v2k68wqUjqUfJLvBHOXNu6i2fCZiqNV5&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
    )
      .then(res => res.json())
      .then(data => {
        return data.data.map(gif => {
          let obj = {}
          obj.url = gif.images.original.url
          obj.title = gif.title
          obj.id = gif.id
          return obj
        })
      })
      .catch(err => console.log(err));
  }
};