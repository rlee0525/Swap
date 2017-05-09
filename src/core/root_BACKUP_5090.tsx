import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
<<<<<<< HEAD
import Post from 'modules/post';
import Search from 'modules/search';
=======
import SignUp from 'modules/signup'
>>>>>>> 2c0ea3ab849c6e4d1a53c9aa0a6e9c9995bf7ad6

interface RootProps {
  store: Store<any>;
}

const Root: React.SFC<RootProps> = ({ store }) => {
  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('/');
    }
  };

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} />
<<<<<<< HEAD
        <Route path="/post" component={Post} />
        <Route path="/search" component={Search} />
=======
        <Route path="/signup" component={SignUp} />
>>>>>>> 2c0ea3ab849c6e4d1a53c9aa0a6e9c9995bf7ad6
      </Router>
    </Provider>
  );
};

export default Root;
