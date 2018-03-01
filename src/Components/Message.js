import React from "react";
import PropTypes from 'prop-types';

const Message = ({ message }) => <p className='' dangerouslySetInnerHTML={{__html: message}}></p>

export default Message;