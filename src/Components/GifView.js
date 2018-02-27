import React from "react";
import GifItem from './GifItem';


const GifView = ({ gifs, toggle }) => {
    const gifNode = gifs.map( gif => <GifItem gif={gif} key={gif.id} toggle={toggle} />)
    return (<div className="results"><ul className="card-container">{gifNode}</ul></div>);
}

export default GifView;


