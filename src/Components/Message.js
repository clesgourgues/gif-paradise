import React from "react";
import PropTypes from 'prop-types';

const Message = ({ message }) => <p className='' dangerouslySetInnerHTML={{__html: message}}></p>

Message.propTypes = {
    message: PropTypes.string.isRequired
}

export default Message;