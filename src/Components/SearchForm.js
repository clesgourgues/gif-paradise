import React from "react";
import SearchInput from './SearchInput';
import ActionButton from './ActionButton';

const SearchForm =  ({ handleSubmit, handleChange, search, reset }) => (
        <form onSubmit={handleSubmit} className="search-group">
            <ActionButton action={handleSubmit} icon='fa fa-search fa-2x' tooltip='Search' dataId='search'/>
            <SearchInput value={search} handleChange={handleChange}/>
            <ActionButton action={reset} icon='fas fa-times fa-2x' tooltip='Cancel your search' dataId='cancel'/>
        </form>
      );

export default SearchForm;
