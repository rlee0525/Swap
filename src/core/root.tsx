import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from 'core';
import Home from 'modules/home';
import Search from 'modules/search';
import About from 'modules/about';
import Post from 'modules/post';
import Careers from 'modules/careers';
import FAQ from 'modules/faq';
import Contact from 'modules/contact';
import Terms from 'modules/terms';
import Bookmarks from 'modules/bookmarks';
import MyPosts from 'modules/my_posts';
import Rfps from 'modules/rfps';
import PostForm from 'modules/post_form';

interface RootProps {
  store: Store<any>;
}

const Root: React.SFC<RootProps> = ({ store }) => {
  const _ensureLoggedIn = (nextState: any, replace: any) => {
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

          {/* Search routes */}
          <Route path="/recent" component={Search} />
          <Route path="/textbooks" component={Search} />
          <Route path="/clothing" component={Search} />
          <Route path="/furniture" component={Search} />
          <Route path="/electronics" component={Search} />
          <Route path="/kitchenware" component={Search} />
          <Route path="/games" component={Search} />
          <Route path="/others" component={Search} />
          <Route path="/search" component={Search} />

          {/* Information routes */}
          <Route path="/about" component={About} />
          <Route path="/careers" component={Careers} />
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
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
          <Route path="/dashboard">
            <Route path="posts" component={MyPosts} />
            <Route path="bookmarks" component={Bookmarks} />
            <Route path="rfps" component={Rfps} />
          </Route>
          
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
