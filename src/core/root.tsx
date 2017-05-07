import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';

interface IRootProps {
  store: Store<any>;
}

const Root: React.SFC<IRootProps> = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={ App } />
    </Router>
  </Provider>
);

export default Root;
