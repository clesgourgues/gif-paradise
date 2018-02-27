import React from "react";

const ActionButton = ({ icon, action, classButton }) => (
    <button className={`action ${classButton}`}>
    <i className={icon} onClick={action}></i>
    </button>
);

export default ActionButton;