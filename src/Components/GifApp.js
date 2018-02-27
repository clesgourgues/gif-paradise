import React from "react";
import Header from './Header';
import GifView from './GifView';
import getGifs from '../Services/getGifs';
import getLocalStorage from '../Services/getLocalStorage';
import setLocalStorage from '../Services/setLocalStorage';

export default class GifApp extends React.Component {
    constructor() {
        super();
        this.state = {
            gifs: [
                {
                    title: '',
                    url: "https://media.giphy.com/media/xThta0XbpdzWZFK0z6/giphy.gif",
                    id: 'aaaa',
                    favourite: false
                }
            ],
            search: '',
            message: ''
        }
    }

    componentWillMount() {
        const searchTerm = window.location.search;
        if (searchTerm === '') {
            this.setState({
                message: 'Type your search, we will find gif stuff for you !'
            })
        } else {
            this.searchGif(searchTerm);
        }
    }

    searchGif = (searchTerm) => {
        getGifs(searchTerm).then(data => {
            const favouriteGifs = getLocalStorage('gifs');
            const ids = favouriteGifs.map(favourite => favourite.id);
            const gifs = data.map(gif => {
                let obj = {};
                obj.url = gif.images.original.url;
                obj.title = gif.title;
                obj.id = gif.id;
                obj.favourite = ids.indexOf(gif.id) > -1;
                return obj;
            })
            this.setState({
                gifs,
                search: searchTerm,
                message: `we found ${gifs.length} gifs for you`
            });
        })
    }

    toggleGif  = (gif) => {
        const nextGifs = this.state.gifs.map(stateGif => {
            if (stateGif.id === gif.id) {
                return {
                    ...stateGif,
                    favourite: !gif.favourite
                }
            } else { return stateGif }
        }) 
        if(gif.favourite) {
            this.removeFavourite(gif)
        } else {
            this.insertFavourite(gif)
        }
        this.setState({
            gifs: nextGifs,
            message: `${gif.favourite ? 'Added' : 'Removed'} ${gif.title} from your favourites`
        });
    }

    insertFavourite = (gif) => {
        const favouriteGifs = getLocalStorage('gifs');
        gif.favourite = true
        const favIds = favouriteGifs.map(gif => gif.id);
        if (favIds.indexOf(gif.id) < 0) {
            favouriteGifs.push(gif)
        }
        setLocalStorage('gifs', JSON.stringify(favouriteGifs));
    }

    removeFavourite = (gif) => {
        gif.favourite = false
        const favouriteGifs = getLocalStorage('gifs');
        const filteredGifs = favouriteGifs.filter(favourite => favourite.id !== gif.id);
        setLocalStorage('gifs', JSON.stringify(filteredGifs));
    }

    showFavourites = () => {
        const favouriteGifs = getLocalStorage('gifs');
        this.setState({ 
            gifs: favouriteGifs,
            message: favouriteGifs.length > 0 ? 
            `You have ${favouriteGifs.length} favourite gifs !` : 
            `Oh ! It seems you dont like gifs !`
         });

    }

    handleChange = (event) => {
        this.setState({ search: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const searchTerm = this.state.search;
        this.searchGif(searchTerm);
    }

    reset = () => {
        this.setState({
            gifs: [],
            search: '',
            message: 'Type your search, we will find good gif stuff for you !'
        });
    }

    render() {
        return (
            <div className="container" >
                <Header title={'Gif Paradise'}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    reset={this.reset}
                    search={this.state.search}
                    favourites={this.showFavourites}
                    message={this.state.message} />
                <GifView gifs={this.state.gifs} toggleGif={this.toggleGif} />
            </div >
        );
    }
}