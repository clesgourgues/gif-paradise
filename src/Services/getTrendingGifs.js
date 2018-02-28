const getTrendingGifs = () => {
    return fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=v2k68wqUjqUfJLvBHOXNu6i2fCZiqNV5&limit=25`
    )
        .then(res => res.json())
        .then(data => data.data)
        .catch(err => console.log(err));
}

export default getTrendingGifs;