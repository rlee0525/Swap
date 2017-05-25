import React from 'react';
import { IUser } from 'common/interfaces';
import { DashboardHeaders, Bookmarks } from './subcomponents';

const data = require('./dashboard_data.json');

interface Props {
  location: {
    search: string;
  },
  user: IUser;
}

interface State {
}

class Dashboard extends React.Component<Props, State> {
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
        return <div>posts</div>
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