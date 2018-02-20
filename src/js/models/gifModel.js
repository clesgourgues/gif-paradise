export default class GifModel {

	constructor(state) {
		const localStorage = window.localStorage;
		let favouriteGifs;
		this.getLocalStorage = (state) => {
			console.log(localStorage.getItem(state))
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
					let obj = {}
					obj.url = gif.images.original.url
					obj.title = gif.title
					obj.id = gif.id
					obj.favourite = false
					// si l'id dans les favourites favourites : true
					return obj
				})
			})
			.catch(err => console.log(err));
	}

	find(query, callback) {
		const todos = this.getLocalStorage();
		let k;

		callback(todos.filter(todo => {
			for (k in query) {
				if (query[k] !== todo[k]) {
					return false;
				};
			}
			return true;
		}));
	}

	insert(gif, callback) {
		const gifs = this.getLocalStorage('gifs');
		console.log(gifs)
		gifs.push(gif);
		this.setLocalStorage('gifs', JSON.stringify(gifs));
		if (callback) {
			callback();
		}
	}

	/**
	 * Remove items from the Store based on a query.
	 *
	 * @param {ItemQuery} query Query matching the items to remove
	 * @param {function(ItemList)|function()} [callback] Called when records matching query are removed
	 */
	remove(gif, callback) {

		const todos = this.getLocalStorage().filter(gifs => {
			for (k in query) {
				if (query[k] !== todo[k]) {
					return true;
				}
			}
			return false;
		});

		this.setLocalStorage(gifs);

		if (callback) {
			callback(todos);
		}
	}

}