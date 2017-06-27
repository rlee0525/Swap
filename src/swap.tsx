import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux';
import configureStore from './core/store';
import Root from './core/root';
import * as firebase from 'firebase';

declare var window;

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
