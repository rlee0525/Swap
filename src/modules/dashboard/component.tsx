import React from 'react';
import { DashboardHeaders } from './subcomponents';

const data = require('./dashboard_data.json');

interface Props {
  location: {
    search: string;
  }
}

interface State {
}

class Dashboard extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    props.fetchBookmarks(this.props.user.auth.accessToken)
  }

  renderSubcomponent() {
    let page = this.props.location.search.slice(1);

    switch (page) {
      case 'bookmarks':
        return <div>bookmarks</div>
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