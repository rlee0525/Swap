import React from 'react';
import { IUser, IDashboard } from 'common/interfaces';
import { DashboardHeaders, Bookmarks, MyPosts, Rfps } from './subcomponents';

const data = require('./dashboard_data.json');

interface Props {
  location: {
    search: string;
  },
  user: IUser;
  dashboard: IDashboard;
  fetchBookmarks : (accessToken: string) => JQueryPromise<void>;
  deleteBookmark : (id: number, accessToken: string) => JQueryPromise<void>;
  fetchMyPosts : (accessToken: string) => JQueryPromise<void>;
  deleteMyPost : (id: number, accessToken: string) => JQueryPromise<void>;
  fetchRfps : (accessToken: string) => JQueryPromise<void>;
  deleteRfps : (id: number, accessToken: string) => JQueryPromise<void>;
}

class Dashboard extends React.Component<Props, {}> {
  renderSubcomponent() {
    let page = this.props.location.search.slice(1);

    let { dashboard, user } = this.props;

    switch (page) {
      case 'bookmarks':
      let { fetchBookmarks, deleteBookmark } = this.props;
        return (
          <Bookmarks
            bookmarks={dashboard.bookmarks}
            fetchBookmarks={fetchBookmarks}
            deleteBookmark={deleteBookmark}
            user={user}
          />
        );
      case 'rfps':
        let { fetchRfps, deleteRfps } = this.props;
        return (
          <Rfps
            user={user}
            rfps={dashboard.rfps}
            fetchRfps={fetchRfps}
            deleteRfps={deleteRfps}
          />
        );
      default:
        let { fetchMyPosts, deleteMyPost } = this.props;
        return (
          <MyPosts 
            user={user}
            myPosts={dashboard.myPosts}
            fetchMyPosts={fetchMyPosts}
            deleteMyPost={deleteMyPost}
          />
        );
    }
  }

  render() {
    let page = this.props.location.search.slice(1);

    let button = null;

    if (page === 'rfps') {
      button = { title: 'Create Alert', link: 'rfps/create' }
    } else if (page === 'posts') {
      button = { title: 'Create Post', link: 'posts/create' }
    }
    
    return (
      <div className="container">
        <DashboardHeaders 
          headers={data.dashboardHeaders}
          active={page}
          button={button}
        />
        { this.renderSubcomponent() }
      </div>
    );
  }
}

export default Dashboard;