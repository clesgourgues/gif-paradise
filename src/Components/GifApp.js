import React from "react";
import Header from './Header';
import GifView from './GifView';
import getGifs from '../Services/getGifs';
import getfavouriteGifs from '../Services/getfavouriteGifs';
import setfavouriteGif from '../Services/setfavouriteGifs';
import deletefavouriteGif from '../Services/deletefavouriteGif';

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
        console.log(searchTerm)
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
            const favouriteGifs = getfavouriteGifs('gifs');
            console.log('favoris :', favouriteGifs);
            const ids = favouriteGifs.map(favourite => favourite.id);
            const gifs = data.map(gif => {
                let obj = {};
                obj.url = gif.images.original.url;
                obj.title = gif.title;
                obj.id = gif.id;
                obj.favourite = ids.indexOf(gif.id) > -1;
                obj.favourite = false;
                return obj;
            })
            this.setState({
                gifs: gifs,
                search: searchTerm,
                message: 'we found stuff for you'
            });
        })
    }

    saveGif = (id) => {
        const gif = {}
        setfavouriteGif('gifs', gif)
            .then((res) => {
                this.state.data.push(res.data);
                this.setState({ gifs: this.state.data });
            });
    }

    deleteGif = (id) => {
        const remainder = this.state.data.filter((gif) => {
            if (gif.id !== id) return gif;
        });
        deletefavouriteGif(id)
            .then((res) => {
                this.setState({ gifs: remainder });
            })
    }

    toggleGif = (id) => {
        console.log(id);
    }

    showFavourites = () => {
        const favouriteGifs = getfavouriteGifs('gifs');
        this.setState({
            gifs: favouriteGifs
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
            message: 'Type your search, we will find gif stuff for you !'
        });
    }

    render() {
        return (
            <div className="container">
                <Header title={'Gif Paradise'}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    reset={this.reset}
                    searchTerm={this.state.searchTerm}
                    favourites={this.showFavourites}
                    message={this.state.message} />
                <GifView gifs={this.state.gifs} toggle={this.toggleGif} />
            </div>
        );
    }
}