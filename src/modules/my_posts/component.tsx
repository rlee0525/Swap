import React from 'react';
import { shortenString, timeFromNow } from 'helpers';

interface Post {
  title: string;
  description: string;
  price: number;
  created_at: string;
  condition: string;
  img_url1: string;
  img_url2: string;
  img_url3: string;
}

interface Props {
  searchResult: Post [];
}

interface State {
}

class MyPosts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public redirect(id) {
    window.location.href = `#/posts/${id}`
  }

  renderListItem(post: Post, idx: number) {
    return (
      <tr key={idx} onClick={() => this.redirect(post.id)}>
        <td>{post.title}</td>
        <td>{shortenString(post.description, 30)}</td>
        <td>${Number(post.price).toLocaleString()}</td>
        <td>{timeFromNow(post.created_at)}</td>
        <td>{post.condition}</td>
      </tr>
    )
  }

  render() {
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
    )
  }
}

export default MyPosts;
