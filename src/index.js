import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import GifApp from './GifApp';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk'

// const persistedState = localStorage.getItem('gifs') ? JSON.parse(localStorage.getItem('gifs')) : {}
const store = createStore(reducers, applyMiddleware(thunk))


/* store.subscribe(() => {
    localStorage.setItem('gifs', JSON.stringify(store.getState()))
  }) */

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <GifApp />
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();

