import React from "react";
import Title from './Title';
import SearchForm from './SearchForm';
import ActionButton from './ActionButton';
import Message from './Message';

const Header = ({ title, searchTerm, searchGif, message, favourites, handleSubmit, handleChange, reset }) => (
    <div>
        <ActionButton icon={'fas fa-heart fa-2x'} action={favourites} classButton={'favourites'} />
        <div className="search-container">
            <Title title={title} />
            <SearchForm searchTerm={searchTerm} handleChange={handleChange} handleSubmit={handleSubmit} reset={reset}/>
            <Message message={message} />
        </div>
    </div>
);

export default Header;