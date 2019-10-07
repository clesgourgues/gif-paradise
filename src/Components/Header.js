import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Title from "./Title";
import SearchForm from "./SearchForm";

const Header = ({ title }) => (
  <div className="search-container">
    <NavLink exact to="/">
      <Title title={title} />
    </NavLink>
    <SearchForm />
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
