import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";
import appStore from "../store/AppStore";

const GifApp = () => <Route path="/" render={props => <Home {...props} store={appStore} />} />;

export default GifApp;
