import * as React from 'react';
import * as ReactDOM from 'react-dom';
import configureStore from './core/store';
import Root from './core/root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  let preloadedState = {
    user: JSON.parse(localStorage.getItem('google-user'))
  };
  const store = configureStore(preloadedState);

  ReactDOM.render(<Root store={store}/>, root);
  // window.store = store;
  // window.s = store.getState;
});