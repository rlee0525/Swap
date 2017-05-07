import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux';
import configureStore from './core/store';
import Root from './core/root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  let preloadedState = {
    user: JSON.parse(localStorage.getItem('google-user'))
  };
  const store: Store<any> = configureStore(preloadedState);

  ReactDOM.render(<Root store={store}/>, root);
  // window.store = store;
  // window.s = store.getState;
});