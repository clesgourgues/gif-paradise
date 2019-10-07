import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import FavouritesNav from "./FavouritesNav";
import Header from "./Header";
import GifView from "./GifView";
import Message from "./Message";

import getGifs from "../Services/getGifs";
import getTrendingGifs from "../Services/getTrendingGifs";
import getLocalStorage from "../Services/getLocalStorage";
import setLocalStorage from "../Services/setLocalStorage";

import messages from "../helpers/messages";
import { getGifsFromResponse } from "../helpers/gifs";

import "../App.css";

const Home = ({ location }) => {
  let [gifs, setGifs] = useState([]);
  let [favourites, setfavourites] = useState([]);
  let [message, setMessage] = useState("");

  useEffect(() => {
    const search = location.search.split("=")[1];
    searchGif(search);
  });

  useEffect(() => {
    const savedFavouriteGifs = getLocalStorage("gifs");
    setfavourites(savedFavouriteGifs);
  }, []);

  const searchGif = async search => {
    const newMessage = search ? messages.search : messages.trending;
    const data = search ? await getGifs(search) : await getTrendingGifs();
    const ids = favourites ? favourites.map(favourite => favourite.id) : [];
    setMessage(newMessage);
    setGifs(getGifsFromResponse(data, ids));
  };

  const toggleGif = toggledGif => {
    const nextGifs = gifs.map(gif =>
      gif.id === toggledGif.id
        ? {
            ...gif,
            favourite: !toggledGif.favourite
          }
        : gif
    );
    setGifs(nextGifs);

    const nextFavourites = !toggledGif.favourite
      ? [
          ...favourites,
          {
            ...toggledGif,
            favourite: !toggledGif.favourite
          }
        ]
      : favourites.filter(favourite => favourite.id !== toggledGif.id);
    setLocalStorage("gifs", nextFavourites);
    setfavourites(nextFavourites);

    const nextMessage = `${toggledGif.favourite ? "Removed" : "Added"} <b>${toggledGif.title}</b> ${
      toggledGif.favourite ? "from" : "to"
    } your favourites.
            You have <b>${nextFavourites.length} favourite gifs !</b>`;
    setMessage(nextMessage);
  };

  const favouriteMessage = gifs =>
    gifs.length > 0
      ? `You have <b>${gifs.length} favourite gifs !</b>
    Click on their <i class="fas fa-heart favourite"></i> 
    if you changed your mind.</p>`
      : "Oh ! It seems you dont like gifs !";

  const renderGifs = (gifs, favourite) => (
    <div>
      <Message message={favourite ? favouriteMessage(gifs) : message} />
      <GifView gifs={gifs} toggleGif={toggleGif} />
    </div>
  );

  return (
    <div>
      <FavouritesNav />
      <Header title={"Gif Paradise"} />
      <Switch>
        <Route exact path="/" render={() => renderGifs(gifs)} />
        <Route exact path="/?q=:search" render={() => renderGifs(gifs)} />
        <Route path="/favourites" render={() => renderGifs(favourites, true)} />
      </Switch>
    </div>
  );
};

export default Home;
