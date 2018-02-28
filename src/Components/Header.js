import React from "react";
import Title from './Title';
import SearchForm from './SearchForm';
import ActionButton from './ActionButton';
import Message from './Message';

const Header = ({ title, search, message, favourites, handleSubmit, handleChange, reset, page }) => (
    <div>
        <ActionButton icon='fas fa-heart fa-3x'
            action={favourites}
            classButton='favourites'
            tooltip='Show your favourite Gifs'
            dataId='show-favourites' />
        <div className="search-container">
            <Title title={title} />
            <SearchForm page={page} search={search} handleChange={handleChange} handleSubmit={handleSubmit} reset={reset} />
            <Message message={message} />
        </div>
    </div>
);

export default Header;