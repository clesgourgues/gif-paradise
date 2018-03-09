import React from "react";
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import CancelButton from './CancelButton';
import { Block } from 'reas';


export default class SearchForm extends React.Component {
    state = {
        searchTerm: '',
    };

    reset = (e) => {
        e.preventDefault();
        this.setState({
            searchTerm: ''
        })
    }

    handleChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const searchTerm = this.state.searchTerm
        return (
            <Block className="search-group">
                <SearchButton searchTerm={searchTerm} />
                <SearchInput value={searchTerm} handleChange={this.handleChange} />
                <CancelButton reset={this.reset} />
            </Block>
        );
    }

}

