export default class GifModel {

	constructor(state) {
		const localStorage = window.localStorage;
		let favouriteGifs;
		this.getLocalStorage = (state) => {
			return favouriteGifs || JSON.parse(localStorage.getItem(state) || '[]');
		};
		this.setLocalStorage = (state, item) => {
			localStorage.setItem(state, item);
		};
	}

	search(searchTerm) {
		return fetch(
			`https://api.giphy.com/v1/gifs/search?api_key=v2k68wqUjqUfJLvBHOXNu6i2fCZiqNV5&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
		)
			.then(res => res.json())
			.then(data => {
				return data.data.map(gif => {
					let favouriteGifs = this.getLocalStorage('gifs');
					const ids = favouriteGifs.map(favourite => favourite.id)
					let obj = {}
					obj.url = gif.images.original.url
					obj.title = gif.title
					obj.id = gif.id
					obj.favourite = ids.indexOf(gif.id) > -1
					console.log(obj.favourite)
					return obj
				})
			})
			.catch(err => console.log(err));
	}


	insert(gif, callback) {
		let favouriteGifs = this.getLocalStorage('gifs');
		favouriteGifs.push(gif);
		this.setLocalStorage('gifs', JSON.stringify(favouriteGifs));
		if (callback) {
			callback();
		}
	}

	remove(gif, callback) {
		let favouriteGifs = this.getLocalStorage('gifs')
		let filteredGifs = favouriteGifs.filter(favourite => favourite.id !== gif.id)
		console.log(filteredGifs)
		this.setLocalStorage('gifs', JSON.stringify(filteredGifs));

		if (callback) {
			callback();
		}
	}

}