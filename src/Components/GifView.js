import React from "react";
import GifItem from './GifItem';

const GifView = ({ gifs, toggleGif }) => {
    const gifNode = gifs.map( gif => <GifItem gif={gif} key={gif.id} toggleGif={toggleGif} />)
    return (<div className="results"><ul className="card-container">{gifNode}</ul></div>);
}

export default GifView;


