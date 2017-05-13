import React from 'react';
import Bookmarks from 'modules/bookmarks';
import { MyPosts } from 'modules/post/subcomponents';

class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div className="container">
          <ul className="nav nav-tabs">
            <li role="presentation" className="active"><a href="#/myposts">Posts</a></li>
            <li role="presentation"><a href="#/mybookmarks">Bookmarks</a></li>
          </ul>
          <div>
            <div className="panel panel-default">
              <div className="panel-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Posting Date</th>
                      <th>Condition</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
