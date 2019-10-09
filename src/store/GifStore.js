import { observable, action, computed, runInAction } from "mobx";

import setLocalStorage from "../Services/setLocalStorage";
import getLocalStorage from "../Services/getLocalStorage";
import getGifs from "../Services/getGifs";
import getTrendingGifs from "../Services/getTrendingGifs";

import messages from "../helpers/messages";
import { getGifsFromResponse } from "../helpers/gifs";

class GifStore {
  @observable gifs = [];
  @observable favourites = [];
  @observable message = "";
  @observable favouriteMessage = "";

  @action async getSavedFavourites() {
    this.favourites = await getLocalStorage("favouriteGifs");
  }

  @action async searchGif(search) {
    const data = search ? await getGifs(search) : await getTrendingGifs();
    const ids = this.favourites ? this.favourites.map(favourite => favourite.id) : [];
    const gifs = getGifsFromResponse(data, ids);
    runInAction(() => {
      this.gifs = gifs;
      this.message = search ? messages.search : messages.trending;
    });
  }

  @action toggleGif(toggledGif) {
    const newGifs = this.gifs.map(gif =>
      gif.id === toggledGif.id
        ? {
            ...gif,
            favourite: !toggledGif.favourite
          }
        : gif
    );
    this.gifs = newGifs;

    const newFavourites = !toggledGif.favourite
      ? [
          ...this.favourites,
          {
            ...toggledGif,
            favourite: !toggledGif.favourite
          }
        ]
      : this.favourites.filter(favourite => favourite.id !== toggledGif.id);
    this.favourites = newFavourites;

    this.syncWithLocalStorage();
    this.message = `${toggledGif.favourite ? "Removed" : "Added"} <b>${toggledGif.title}</b> ${
      toggledGif.favourite ? "from" : "to"
    } your favourites.
            You have <b>${this.favouritesCount} favourite gifs !</b>`;
    this.favouriteMessage =
      this.favouritesCount > 0
        ? `You have <b>${this.favouritesCount} favourite gifs !</b>
    Click on their <i class="fas fa-heart favourite"></i> 
    if you changed your mind.</p>`
        : "Oh ! It seems you dont like gifs !";
  }

  syncWithLocalStorage() {
    setLocalStorage("favouriteGifs", this.favourites);
  }

  @computed get favouritesCount() {
    return this.favourites.length;
  }
}

const gifStore = new GifStore();
gifStore.getSavedFavourites();
gifStore.searchGif();
export default gifStore;
