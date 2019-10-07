import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import GifApp from "./Components/GifApp";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Router>
    <GifApp />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
