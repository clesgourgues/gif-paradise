import React from "react";
import PropTypes from 'prop-types';
import FavouritesNav from './FavouritesNav';
import Title from './Title';
import SearchForm from './SearchForm';

const Header = ({ title }) => (
    <div>
        <FavouritesNav />
        <div className="search-container">
            <Title title={title} />
            <SearchForm />
        </div>
    </div>
);

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;