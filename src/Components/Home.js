import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";

import FavouritesNav from "./FavouritesNav";
import Header from "./Header";
import GifView from "./GifView";
import Message from "./Message";

import getLocalStorage from "../Services/getLocalStorage";
import "../App.css";

@observer
class Home extends Component {
  componentDidMount() {
    const search = this.props.location.search.split("=")[1];
    this.handleSearch(search);
    const savedFavouriteGifs = getLocalStorage("gifs");
    this.favourites = savedFavouriteGifs;
  }

  favouriteMessage = gifs =>
    gifs.length > 0
      ? `You have <b>${gifs.length} favourite gifs !</b>
    Click on their <i class="fas fa-heart favourite"></i> 
    if you changed your mind.</p>`
      : "Oh ! It seems you dont like gifs !";

  renderGifs = (gifs, favourite) => (
    <div>
      <Message message={favourite ? this.favouriteMessage(gifs) : this.message} />
      <GifView gifs={this.gifs} toggleGif={this.handleToggle} />
    </div>
  );
  handleToggle = () => {
    this.props.store.toggleGif();
  };
  handleSearch = () => {
    this.props.store.searchGif();
  };
  render() {
    return (
      <div>
        <FavouritesNav />
        <Header title={"Gif Paradise"} />
        <Switch>
          <Route exact path="/" render={() => this.renderGifs(this.props.store.gifs)} />
          <Route exact path="/?q=:search" render={() => this.renderGifs(this.props.store.gifs)} />
          <Route
            path="/favourites"
            render={() => this.renderGifs(this.props.store.favourites, true)}
          />
        </Switch>
      </div>
    );
  }
}

export default Home;
