import React from "react";
import PropTypes from 'prop-types';
import GifView from './GifView';
import Message from './Message';


const Search = ({ gifs, toggleGif }) => {
    const message = `We found <b>${gifs.length} gifs</b> for you. Click on their <i class="fas fa-heart"></i> to save them in your favourites !`
    return (
        <div>
            <Message message={message} />
            <GifView gifs={gifs} toggleGif={toggleGif} />
        </div>
    )
}

export default Search;