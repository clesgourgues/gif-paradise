import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from './Header';
import Trending from './Trending';
import Search from './Search';
import Favourites from './Favourites';
import getGifs from '../Services/getGifs';
import getTrendingGifs from '../Services/getGifs';
import getLocalStorage from '../Services/getLocalStorage';
import setLocalStorage from '../Services/setLocalStorage';

import '../App.css';

export default class GifApp extends React.Component {
    state = {
        gifs: [],
        favourites: getLocalStorage('gifs'),
        message: ''
    };

    componentDidMount() {
        const search = this.props.location.search.split('=')[1]
        this.searchGif(search);
    }

    componentWillReceiveProps(nextProps) {
        const search = nextProps.location.search.split('=')[1]
        this.searchGif(search);
    }

    searchGif = (search) => {
        const searchEngine = search === '' ? getGifs : getTrendingGifs;
        searchEngine(search).then(data => {
            const ids = this.state.favourites.map(favourite => favourite.id);
            const gifs = data.map(gif => {
                let obj = {};
                obj.url = gif.images.original.url;
                obj.title = gif.title;
                obj.id = gif.id;
                obj.favourite = ids.indexOf(gif.id) > -1; // if the gif is in favourites, set favourite property to true
                return obj;
            })
            this.setState({ gifs });
        })
    }


    toggleGif = (gif) => {
        const nextGifs = this.state.gifs.map(stateGif => { // return a new array with the right favourite property for the toggled gif
            if (stateGif.id === gif.id) {
                return {
                    ...stateGif,
                    favourite: !gif.favourite
                }
            } else { return stateGif }
        })

        const newGif = {
            ...gif,
            favourite: !gif.favourite
        }

        const nextFavourites = newGif.favourite ? // if gif is a favourite one, return an array including it, otherwise split it from it
            [...this.state.favourites, newGif] :
            this.state.favourites.filter(favourite => favourite.id !== newGif.id)

        setLocalStorage('gifs', nextFavourites);

        this.setState({
            gifs: nextGifs,
            message: `${gif.favourite ? 'Removed' : 'Added'} <b>${gif.title}</b> ${gif.favourite ? 'from' : 'to'} your favourites.
            You have <b>${nextFavourites.length} favourite gifs !</b>`,
            favourites: nextFavourites
        });
    }

    render() {
        return (
            <div className="container" >
                <Header title={'Gif Paradise'} />
                <Switch>
                    <Route exact path='/' render={() =>
                        <Trending gifs={this.state.gifs} toggleGif={this.toggleGif} />} />
                    <Route exact path='/?q=:search' render={() =>
                        <Search gifs={this.state.gifs} toggleGif={this.toggleGif} />} />
                    <Route path="/favourites" render={() =>
                        <Favourites gifs={this.state.favourites} toggleGif={this.toggleGif} />} />
                    <Redirect from='*' to='/' />
                </Switch>
            </div >
        );
    }
}