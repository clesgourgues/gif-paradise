import React from "react";
import { Link } from "react-router-dom";
import SearchInput from './SearchInput';
import ActionButton from './ActionButton';


export default class SearchForm extends React.Component {
    state = {
        searchTerm: '',
    };

    reset = () => {
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
            <form className="search-group">
                <Link to={`/?q=${searchTerm}`}>
                    <ActionButton icon='fa fa-search fa-2x' tooltip='Search' dataId='search' />
                </Link>
                <SearchInput value={searchTerm} handleChange={this.handleChange} />
                <Link to='/'>
                    <ActionButton action={this.reset} icon='fas fa-times fa-2x' tooltip='Cancel your search' dataId='cancel' />
                </Link>
            </form>
        );
    }

}

