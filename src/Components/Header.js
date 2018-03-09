import React from "react";
import PropTypes from 'prop-types';
import Title from './Title';
import SearchForm from './SearchForm';

const Header = ({ title }) => (
        <div className="search-container">
            <Title title={title} />
            <SearchForm />
        </div>
);

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;