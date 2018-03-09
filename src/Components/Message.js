import React from "react";
import PropTypes from 'prop-types';

const Message = ({ message }) => <p dangerouslySetInnerHTML={{__html: message}}></p>

Message.propTypes = {
    message: PropTypes.string
}

export default Message;