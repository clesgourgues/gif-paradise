import React from "react";
import ActionButton from './ActionButton';
import { NavLink } from "react-router-dom";

const FavouritesNav = () => (
    <NavLink exact to="/favourites" activeClassName="favourited">
        <ActionButton icon='fas fa-heart fa-3x'
            classButton='favourites'
            tooltip='Show your favourite Gifs'
            dataId='show-favourites' />
    </NavLink>
)

export default FavouritesNav 
