import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Tooltip } from 'reas';
import FaTimes from 'react-icons/lib/fa/times-circle'

const CancelButton = ({ reset }) => (
    <Link  to={{name: '/',
    search: ''
  }} onClick={reset}>
            <FaTimes size={32} />
            <Tooltip pos="right">
                <Tooltip.Arrow pos="left" />Cancel</Tooltip>
    </Link>
);

CancelButton.propTypes = {
    searchTerm: PropTypes.string
}

export default CancelButton;



