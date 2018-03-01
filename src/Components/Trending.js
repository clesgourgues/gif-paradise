import React from "react";
import PropTypes from 'prop-types';
import GifView from './GifView';
import Message from './Message';


const Trending = ({ gifs, toggleGif, message }) => (
    <div>
        <Message message={message} />
        <GifView gifs={gifs} toggleGif={toggleGif} />
    </div>
)

Trending.propTypes = {
    gifs: PropTypes.array.isRequired,
    toggleGif: PropTypes.func.isRequired,
    message: PropTypes.string
}

export default Trending;