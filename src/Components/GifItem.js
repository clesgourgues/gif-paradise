import React from "react";

const GifItem = ({ gif, toggleGif }) => {
    const iconClass = gif.favourite ? 'favourite' : '';
    return (
        <li className="card" key={gif.id}>
            <img className="loading" src={gif.url} alt={gif.title} />
            <div className="card-body">
                <p>{gif.title}</p>
                <i className={`fas fa-heart ${iconClass}`} onClick={() => { toggleGif(gif) }}></i>
                {gif.favourite ? <p className="favourite">One of your favourites !</p> :''}
            </div>
        </li>
    );
}

export default GifItem;
