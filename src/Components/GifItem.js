import React from "react";

const GifItem = ({ gif, toggle }) => {
    const iconClass = gif.favourite ? 'favourite' : '';
    return (
        <li className="card" key={gif.id}>
            <img className="loading" src={gif.url} alt={gif.title} />
            <div className="card-body">
                <p>{gif.title}</p>
                <i className={`fas fa-heart ${iconClass}`} onClick={() => { toggle(gif.id) }}></i>
                <p className="favourite"><a href="/favourites">One of your favourites !</a></p>
            </div>
        </li>
    );
}

export default GifItem;
