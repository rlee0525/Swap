import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux';
import configureStore from './core/store';
import Root from './core/root';
declare var window;

window.start = user => {
  // document.addEventListener('DOMContentLoaded', () => {
    const root: HTMLElement = document.getElementById('root');

    let preloadedState: object = {};


    preloadedState = { user: user };
    console.log(window.user)
    console.log(preloadedState)
    const store = configureStore(preloadedState);

    ReactDOM.render(<Root store={store}/>, root);
    window.store = store;
    window.s = store.getState;
  // });
}
