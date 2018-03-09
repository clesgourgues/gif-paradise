import React from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from 'reas'
import FaHeart from 'react-icons/lib/fa/heart'

const FavouritesNav = () => (
    <NavLink exact to="/favourites" activeStyle={{color: '#e12D53'}}>
            <FaHeart size={32}/>
            <Tooltip pos="right">
            <Tooltip.Arrow pos="left" />
                Show your favourite Gifs
            </Tooltip>
    </NavLink>
)

export default FavouritesNav 
