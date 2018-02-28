import React from "react";
import Header from './Header';
import GifView from './GifView';
import getGifs from '../Services/getGifs';
import getLocalStorage from '../Services/getLocalStorage';
import setLocalStorage from '../Services/setLocalStorage';

export default class GifApp extends React.Component {
    state = {
        gifs: [
            {
                title: '',
                url: "https://media.giphy.com/media/xThta0XbpdzWZFK0z6/giphy.gif",
                id: 'aaaa',
                favourite: false
            }
        ],
        search: '',
        message: 'Type your search, we will find gif stuff for you !',
        page: 'home',
        favourites: getLocalStorage('gifs')
    };

    searchGif = (search) => {
        getGifs(search).then(data => {
            const ids = this.state.favourites.map(favourite => favourite.id);
            const gifs = data.map(gif => {
                let obj = {};
                obj.url = gif.images.original.url;
                obj.title = gif.title;
                obj.id = gif.id;
                obj.favourite = ids.indexOf(gif.id) > -1; // if the gif is in favourites, set favourite property to true
                return obj;
            })
            this.setState({
                gifs,
                search,
                message: `we found <b>${gifs.length} gifs</b> for you.
                <br />Click on their <i class="fas fa-heart"></i> 
                to save them in your favourites !`,
                page: 'search'
            });
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
            message: `${gif.favourite ? 'Removed' : 'Added'} <b>${gif.title}</b> ${gif.favourite ? 'from' : 'to'} your favourites.<br />
            You have <b>${nextFavourites.length} favourite gifs !</b>`,
            favourites: nextFavourites
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
            gifs: [
                {
                    title: '',
                    url: "https://media.giphy.com/media/xThta0XbpdzWZFK0z6/giphy.gif",
                    id: 'aaaa',
                    favourite: false
                }
            ],
            search: '',
            message: 'Type your search, we will find good gif stuff for you !',
            page: 'home'
        });
    }

    showFavourites = () => {
        const message = this.state.favourites.length > 0 ?
            `You have <b>${this.state.favourites.length} favourite gifs !</b>
            <br />Click on their <i class="fas fa-heart favourite"></i> 
            if you changed your mind or <a>go back to search</a></p>`
            : 'Oh ! It seems you dont like gifs !'

        this.setState({
            page: 'favourites',
            message
        })
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
                <GifView gifs={this.state.page === 'favourites' ? this.state.favourites : this.state.gifs} toggleGif={this.toggleGif} />
            </div >
        );
    }
}