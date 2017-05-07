import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import routes from './routes';

interface RootProps {
  store: Store<any>
}

const Root:React.SFC<RootProps> = ({ store }) => (
  <Provider store={ store }>
    <div>Hi</div>
  </Provider>
);

export default Root;