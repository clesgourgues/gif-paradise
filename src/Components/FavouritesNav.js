import React from "react";
import ActionButton from './ActionButton';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

const FavouritesNav = ({ favourites }) => (
    <NavLink exact to="/favourites" activeClassName="favourited">
        <ActionButton icon='fas fa-heart fa-3x'
            action={favourites}
            classButton='favourites'
            tooltip='Show your favourite Gifs'
            dataId='show-favourites' />
    </NavLink>
)

export default FavouritesNav 
