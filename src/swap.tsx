import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux';
import configureStore from './core/store';
import Root from './core/root';
import * as firebase from 'firebase';
declare var window;

const firebaseConfig = {
  appId: process.env.APPID,
  firebaseConfig: {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID
  }
};

window.start = user => {
  // document.addEventListener('DOMContentLoaded', () => {
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
  // });
}
