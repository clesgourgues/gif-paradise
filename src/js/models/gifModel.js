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
					const favouriteGifs = this.getLocalStorage('gifs');
					const ids = favouriteGifs.map(favourite => favourite.id);
					let obj = {};
					obj.url = gif.images.original.url;
					obj.title = gif.title;
					obj.id = gif.id;
					obj.favourite = ids.indexOf(gif.id) > -1;
					return obj;
				})
			})
			.catch(err => console.log(err));
	}

	insert(gif) {
		const favouriteGifs = this.getLocalStorage('gifs');
		favouriteGifs.push(gif);
		this.setLocalStorage('gifs', JSON.stringify(favouriteGifs));
	}

	remove(gif) {
		const favouriteGifs = this.getLocalStorage('gifs');
		const filteredGifs = favouriteGifs.filter(favourite => favourite.id !== gif.id);
		this.setLocalStorage('gifs', JSON.stringify(filteredGifs));
	}

}