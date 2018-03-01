import React from 'react';
import { Route } from "react-router-dom";
import Home from './Home';

const GifApp = () => (
    <Route path='/' component={Home} />
)

export default GifApp