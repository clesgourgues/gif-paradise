import React from "react";
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const ActionButton = ({ icon, action, classButton, tooltip, dataId }) => (
    <div>
        <button onClick={action} className={`action ${classButton}`} data-tip data-for={dataId}>
            <i className={icon}></i>
        </button>
        <ReactTooltip class='tooltip' id={dataId}>
            <span>{tooltip}</span>
        </ReactTooltip>
    </div>
);

ActionButton.propTypes = {
    icon: PropTypes.string.isRequired,
    action: PropTypes.func,
    classButton: PropTypes.string,
    tooltip: PropTypes.string,
    dataId: PropTypes.string,
}

export default ActionButton;

