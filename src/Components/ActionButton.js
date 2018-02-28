import React from "react";
import ReactTooltip from 'react-tooltip';

const ActionButton = ({ icon, action, classButton, tooltip, dataId }) => (
    <div>
        <button className={`action ${classButton}`} data-tip data-for={dataId}>
            <i className={icon} onClick={action}></i>
        </button>
        <ReactTooltip class='tooltip' id={dataId}>
            <span>{tooltip}</span>
        </ReactTooltip>
    </div>
);

export default ActionButton;