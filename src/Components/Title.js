import React from "react";
import PropTypes from 'prop-types';

const Title = ({ title })  => (
    <div>
        <h1>{title}</h1>
        <h3>The best place for gif stuff.</h3>
    </div>
);

Title.propTypes = {
    title: PropTypes.string.isRequired
}

export default Title;