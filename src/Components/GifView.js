import React from "react";
import PropTypes from "prop-types";
import GifItem from "./GifItem";

const GifView = ({ gifs, toggleGif }) => (
  <div className="results">
    <ul className="card-container">
      {gifs.map(gif => (
        <GifItem gif={gif} key={gif.id} toggleGif={toggleGif} />
      ))}
    </ul>
  </div>
);

GifView.propTypes = {
  gifs: PropTypes.array.isRequired,
  toggleGif: PropTypes.func.isRequired
};

export default GifView;
