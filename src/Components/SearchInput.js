import React from "react";

const SearchInput = ({ value, handleChange }) => (
    <input type="text" value={value} onChange={handleChange} />
);

export default SearchInput;