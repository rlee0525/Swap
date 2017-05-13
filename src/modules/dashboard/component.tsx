import React from 'react';
import Bookmarks from 'modules/bookmarks';
import { MyPosts } from 'modules/post/subcomponents';

class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }


  public componentDidMount() {
  }

  public renderList() {
    let path = this.props.router.getCurrentLocation().pathname;
    if (path === "/dashboard" || path === "myPosts") {
      return null;
    } else if (path === "/bookmarks") {
      return <Bookmarks props={this.props} />;
    }
  }

  public render() {
    return (
      <div>
        <div className="container">
          <ul className="nav nav-tabs">
            <li role="presentation" className="active"><a href="#/myposts">Posts</a></li>
            <li role="presentation"><a href="#/bookmarks">Bookmarks</a></li>
          </ul>
          {this.renderList()}
        </div>
      </div>
    );
  }
}

export default Dashboard;
