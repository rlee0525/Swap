import React from 'react';
import { IUser, IDashboard } from 'common/interfaces';
import { DashboardHeaders, Bookmarks, MyPosts } from './subcomponents';

const data = require('./dashboard_data.json');

interface Props {
  location: {
    search: string;
  },
  user: IUser;
  dashboard: IDashboard;
  fetchBookmarks : (accessToken: string) => JQueryPromise<void>;
  deleteBookmark : (id: number, accessToken: string) => JQueryPromise<void>;
}

class Dashboard extends React.Component<Props, {}> {
  renderSubcomponent() {
    let page = this.props.location.search.slice(1);

    let { dashboard, user, fetchBookmarks, deleteBookmark } = this.props;

    switch (page) {
      case 'bookmarks':
        return (
          <Bookmarks
            bookmarks={dashboard.bookmarks}
            fetchBookmarks={fetchBookmarks}
            deleteBookmark={deleteBookmark}
            user={user}
          />
        );
      case 'rfps':
        return <div>rfps</div>
      default:
        return (
          <MyPosts 
            user={user}
            myPosts={dashboard.myPosts}
          />
        );
    }
  }

  render() {
    let page = this.props.location.search.slice(1);

    return (
      <div className="container">
        <DashboardHeaders headers={data.dashboardHeaders} active={page} />
        { this.renderSubcomponent() }
      </div>
    );
  }
}

export default Dashboard;