const deletefavouriteGif = (id) => {
    const favouriteGifs = this.getLocalStorage('gifs');
    const filteredGifs = favouriteGifs.filter(favourite => favourite.id !== id);
    this.setLocalStorage('gifs', JSON.stringify(filteredGifs));
}

export default deletefavouriteGif;