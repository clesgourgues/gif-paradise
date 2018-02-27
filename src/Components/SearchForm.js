import React from "react";
import SearchInput from './SearchInput';
import ActionButton from './ActionButton';

const SearchForm =  ({ handleSubmit, handleChange, search, reset }) => (
        <form onSubmit={handleSubmit} className="search-group">
            <ActionButton action={handleSubmit} icon='fa fa-search' />
            <SearchInput value={search} handleChange={handleChange}/>
            <ActionButton action={reset} icon='fas fa-times' />
        </form>
      );

export default SearchForm;
