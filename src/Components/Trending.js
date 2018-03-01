import React from "react";
import PropTypes from 'prop-types';
import GifView from './GifView';
import Message from './Message';


const Trending= ({ gifs, toggleGif }) => {
    const message = `Here are the <b>most trending Gifs.</b>
    Type your search to find your own !`
    return (
        <div>
            <Message message={message} />
            <GifView gifs={gifs} toggleGif={toggleGif} />
        </div>
    )
}

export default Trending;