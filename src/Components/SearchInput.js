import React from "react";

const SearchInput = ({ value, handleChange }) => (
    <input type="text" value={value} onChange={handleChange} placeholder='Type your search'/>
);

export default SearchInput;