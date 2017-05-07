import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

interface IRootProps {
  store: Store<any>;
}

const Root: React.SFC<IRootProps> = ({ store }) => (
  <Provider store={store}>
    <div>Swap</div>
  </Provider>
);

export default Root;
