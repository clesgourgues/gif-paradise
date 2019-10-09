import React from "react";
import PropTypes from "prop-types";
import GifView from "./GifView";
import Message from "./Message";

const Gifs = props => {
  console.log("gifs props", props);
  return (
    <div>
      <Message message={props.message} />
      <GifView gifs={props.gifs} toggleGif={props.handleToggle} />
    </div>
  );
};

Gifs.propTypes = {
  gifs: PropTypes.array.isRequired,
  handleToggle: PropTypes.func.isRequired
};

export default Gifs;
