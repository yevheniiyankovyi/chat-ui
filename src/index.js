import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import App from './components/app';
import { reducers } from './reducers/reducers';
import './index.css';

const store = createStore(
  reducers, 
  applyMiddleware(
    thunkMiddleware
));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)