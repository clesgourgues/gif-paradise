import React, { useState } from "react";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
import CancelButton from "./CancelButton";
import { Block } from "reas";

const SearchForm = () => {
  let [search, setSearch] = useState("");

  const reset = e => {
    e.preventDefault();
    setSearch("");
  };

  const handleChange = e => {
    setSearch(e.target.value);
  };

  return (
    <Block className="search-group">
      <SearchButton searchTerm={search} />
      <SearchInput value={search} handleChange={handleChange} />
      <CancelButton reset={reset} />
    </Block>
  );
};

export default SearchForm;
