import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";
import gifStore from "../store/GifStore";

const GifApp = () => <Route path="/" render={props => <Home {...props} store={gifStore} />} />;

export default GifApp;
