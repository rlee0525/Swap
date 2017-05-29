import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from 'core';
import Home from 'modules/home';
import Search from 'modules/search';
import Post from 'modules/post';
import Infos from 'modules/infos';
import Terms from 'modules/terms';
import MyCourses from 'modules/my_courses';
import PostForm from 'modules/post_form';
import Dashboard from 'modules/dashboard';

interface RootProps {
  store: Store<any>;
}

const Root: React.SFC<RootProps> = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />

          {/* Search routes */}
          <Route path="/recent" component={Search} />
          <Route path="/coursematerial" component={Search} />
          <Route path="/furniture" component={Search} />
          <Route path="/clothing" component={Search} />
          <Route path="/electronics" component={Search} />
          <Route path="/housing" component={Search} />
          <Route path="/bikes" component={Search} />
          <Route path="/games" component={Search} />
          <Route path="/others" component={Search} />
          <Route path="/lostandfound" component={Search} />
          <Route path="/mycoursematerial" component={Search} />
          <Route path="/search" component={Search} />

          {/* Information routes */}
          <Route path="/infos" component={Infos} />
          <Route path="/terms" component={Terms} />

          {/* Post routes */}
          <Route path="/posts/create" component={PostForm} />
          <Route path="/posts/edit/" >
            <Route path=":id" component={PostForm} />
          </Route>
          <Route path="/posts">
            <Route path=":id" component={Post} />
          </Route>

          {/* Dashboard routes */}
          <Route path="/dashboard" component={Dashboard} />

        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
