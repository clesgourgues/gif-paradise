import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";

import FavouritesNav from "./FavouritesNav";
import Header from "./Header";
import Gifs from "./Gifs";

import "../App.css";

class Home extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.search && this.props.location !== prevProps.location) {
      this.handleSearch();
    }
  }

  handleToggle = gif => {
    this.props.store.toggleGif(gif);
  };

  handleSearch = () => {
    const search = this.props.location.search ? this.props.location.search.split("=")[1] : "";
    this.props.store.searchGif(search);
  };

  routes = ["/", "/?q=:search", "/favourites"];

  render() {
    const {
      store: { favourites, gifs, message, favouriteMessage }
    } = this.props;
    return (
      <div>
        <FavouritesNav />
        <Header title="Gif Paradise" />
        <Switch>
          {this.routes.map(route =>(
              <Route
                exact
                path={route}
                render={() => (
                  <Gifs
                    message={route === "/favourites" ? favouriteMessage : message}
                    gifs={route === "/favourites" ? favourites : gifs}
                    handleToggle={this.handleToggle}
                  />
                )}
              />
            )
          )}
        </Switch>
      </div>
    );
  }
}

export default observer(Home);
