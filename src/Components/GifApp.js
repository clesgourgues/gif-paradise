import React from "react";
import { Route } from "react-router-dom";
import { observable } from "mobx";

import Home from "./Home";

import setLocalStorage from "../Services/setLocalStorage";
import getGifs from "../Services/getGifs";
import getTrendingGifs from "../Services/getTrendingGifs";

import messages from "../helpers/messages";
import { getGifsFromResponse } from "../helpers/gifs";

const appState = observable({
  gifs: [],
  favourites: [],
  message: ""
});

appState.searchGif = async function(search) {
  const newMessage = search ? messages.search : messages.trending;
  const data = search ? await getGifs(search) : await getTrendingGifs();
  const ids = this.favourites ? this.favourites.map(favourite => favourite.id) : [];
  this.message = newMessage;
  this.gifs = getGifsFromResponse(data, ids);
};

appState.toggleGif = function(toggledGif) {
  const nextGifs = this.gifs.map(gif =>
    gif.id === toggledGif.id
      ? {
          ...gif,
          favourite: !toggledGif.favourite
        }
      : gif
  );
  this.gifs = nextGifs;

  const nextFavourites = !toggledGif.favourite
    ? [
        ...this.favourites,
        {
          ...toggledGif,
          favourite: !toggledGif.favourite
        }
      ]
    : this.favourites.filter(favourite => favourite.id !== toggledGif.id);
  setLocalStorage("gifs", nextFavourites);
  this.favourites = nextFavourites;

  const nextMessage = `${toggledGif.favourite ? "Removed" : "Added"} <b>${toggledGif.title}</b> ${
    toggledGif.favourite ? "from" : "to"
  } your favourites.
            You have <b>${nextFavourites.length} favourite gifs !</b>`;
  this.message = nextMessage;
};

const GifApp = () => <Route path="/" component={Home} render={() => <Home store={appState} />} />;

export default GifApp;
