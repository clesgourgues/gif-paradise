import React from "react";
import PropTypes from 'prop-types';

const SearchInput = ({ value, handleChange }) => (
    <input type="text" value={value} onChange={handleChange} placeholder='Type your search'/>
);

SearchInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
}

export default SearchInput;