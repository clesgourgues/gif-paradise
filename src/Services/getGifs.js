const getGifs = (searchTerm) => {
    return fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=v2k68wqUjqUfJLvBHOXNu6i2fCZiqNV5&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
    )
        .then(res => res.json())
        .then(data => data.data)
        .catch(err => console.log(err));
}

export default getGifs;