import React from "react";
import { Route, Switch } from "react-router-dom";
import { Grid } from 'reas';
import FavouritesNav from './Components/FavouritesNav';
import Header from './Components/Header';
import TrendingList from './Containers/TrendingList';
import Search from './Components/Search';
import FavouriteList from './Containers/FavouriteList';

import './App.css';

export default class GifApp extends React.Component {

/*     componentDidMount() {
        const search = this.props.location.search.split('=')[1]
        this.searchGif(search);
    } */

/*     componentWillReceiveProps(nextProps) {
        if(this.props.location.search !== nextProps.location.search){
        const search = nextProps.location.search.split('=')[1]
        this.searchGif(search);
        }
    }


    searchGif = (search) => {
        const searchEngine = search === undefined ? getGifs : getTrendingGifs;
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
            const message = search === undefined ?
                `Here are the <b>most trending Gifs.</b>Type your search to find your own !` :
                `We found <b>${gifs.length} gifs</b> for you. Click on their <i class="fas fa-heart"></i> to save them in your favourites !`
            this.setState({ gifs, message });
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
    } */

    render() {
        return (
            <Grid justify-items="center" rows="20px 30% 1fr">
                <Grid.Item color="#333" >
                    <FavouritesNav />
                </Grid.Item>
                <Grid.Item>
                    <Header title={'Gif Paradise'} />
                </Grid.Item>
                <Switch>
                    <Grid.Item >
                        <Route exact path='/' component={TrendingList}/>
                        <Route exact path='/?q=:search' component={Search} />
                        <Route path="/favourites" component={FavouriteList} />
                    </Grid.Item>
                </Switch>
            </Grid>
        );
    }
}
