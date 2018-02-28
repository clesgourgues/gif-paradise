import React from "react";
import Clipboard from 'react-clipboard.js';
import ReactTooltip from 'react-tooltip';

const GifItem = ({ gif, toggleGif }) => {
    const iconClass = gif.favourite ? 'favourite' : '';
    return (
        <li className="card" key={gif.id}>
            <img className="loading" src={gif.url} alt={gif.title} />
            <div className="card-body">
                <p className='gif-title'>{gif.title}</p>
                <div className='card-actions'>
                    <i className={`fas fa-heart ${iconClass}`} onClick={() => { toggleGif(gif) }} data-tip data-for='toggle'></i>
                    <ReactTooltip class='tooltip' id='toggle'>
                        <span>Add or remove to your favourites</span>
                    </ReactTooltip>
                    <Clipboard data-clipboard-text={gif.url}>
                        <i className="fas fa-bookmark" data-tip data-for='clipboard'></i>
                    </Clipboard>
                    <ReactTooltip class='tooltip' id='clipboard'>
                        <span>Copy the gif url</span>
                    </ReactTooltip>
                </div>
            </div>
        </li>
    );
}

export default GifItem;
