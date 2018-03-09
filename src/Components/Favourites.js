import React from "react";
import PropTypes from 'prop-types';
import GifView from './GifView';
import Message from './Message';


const Favourites = ({ gifs, toggleGif }) => {
    const message = gifs.length > 0 ?
    `You have <b>${gifs.length} favourite gifs !</b>
    Click on their <i class="fas fa-heart favourite"></i> 
    if you changed your mind.</p>`
    : 'Oh ! It seems you dont like gifs !'
    return (
        <div>
            <Message message={message} />
            <GifView gifs={gifs} toggleGif={toggleGif} />
        </div>
    )
}

Favourites.propTypes = {
    gifs: PropTypes.array,
    toggleGif: PropTypes.func
}

export default Favourites;