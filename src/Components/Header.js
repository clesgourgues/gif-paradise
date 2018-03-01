import React from "react";
import PropTypes from 'prop-types';
import FavouritesNav from './FavouritesNav';
import Title from './Title';
import SearchForm from './SearchForm';
import Message from './Message';

const Header = ({ title, message }) => (
    <div>
        <FavouritesNav />
        <div className="search-container">
            <Title title={title} />
            <SearchForm />
            <Message message={message} />
        </div>
    </div>
);

export default Header;