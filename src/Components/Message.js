import React from "react";

const Message = ({ message }) => <p className='' dangerouslySetInnerHTML={{__html: message}}></p>

export default Message;