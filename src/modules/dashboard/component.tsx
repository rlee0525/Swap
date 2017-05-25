import React from 'react';
import { DashboardHeaders } from './subcomponents';

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
    let headers = [
      { 
        title: 'Posts',
        link: 'posts',
        active: page === 'posts'
      },
      {
        title: 'Bookmarks',
        link: 'bookmarks',
        active: page === 'bookmarks'
      },
      {
        title: 'alerts',
        link: 'rfps',
        active: page === 'rfps'
      }
    ];

    return (
      <div className="container">
        <DashboardHeaders headers={headers} />
      </div>
    );
  }
}

export default Dashboard;