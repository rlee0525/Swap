declare var window;

import { Store } from 'redux';
import * as React from 'react';
import * as firebase from 'firebase';
import * as ReactDOM from 'react-dom';

import Root from './core/root';
import configureStore from './core/store';

window.start = user => {
  const root: HTMLElement = document.getElementById('root');

  $.ajax({
    method: "GET",
    url: "api/app_keys/firebase"
  }).then(
    config => {
      let variables = config.variables;
      firebase.initializeApp(JSON.parse(variables));
  });

  let preloadedState: object = {};

  preloadedState = { user: user };
  const store = configureStore(preloadedState);

  ReactDOM.render(<Root store={store}/>, root);
  window.store = store;
  window.s = store.getState;
}
