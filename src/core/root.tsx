import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import Home from 'modules/home';
import Search from 'modules/search';
import About from 'modules/about';
import Post from 'modules/post';
import Careers from 'modules/careers';

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
        <Route path="/" component={App}>
        <IndexRoute component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/about" component={About} />
          <Route path="/post" component={Post} />
          <Route path="/careers" component={Careers} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
