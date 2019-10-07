import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Tooltip } from "reas";
import FaSearch from "react-icons/lib/fa/search";

const SearchButton = ({ searchTerm }) => (
  <Link to={{ pathname: "/", search: `?q=${searchTerm}` }}>
    <FaSearch size={32} />
    <Tooltip pos="left">
      <Tooltip.Arrow pos="right" />
      Search
    </Tooltip>
  </Link>
);

SearchButton.propTypes = {
  searchTerm: PropTypes.string
};

export default SearchButton;
