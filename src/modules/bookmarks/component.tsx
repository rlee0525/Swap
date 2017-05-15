import React from 'react';
import Clipboard from 'clipboard';
import { shortenString, timeFromNow } from 'helpers';

class Bookmarks extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.initializeClipboard = this.initializeClipboard.bind(this);
    this.fetchBookmarkedPosts = this.fetchBookmarkedPosts.bind(this);
    this.deleteBookmarkedPost = this.deleteBookmarkedPost.bind(this);
    this.state = { bookmarkedPosts: [] }
  }

  public fetchBookmarkedPosts() {
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/api/bookmarks"
    }).then(bookmarkedPosts => this.setState({ bookmarkedPosts }))
  }

  public deleteBookmarkedPost(postId) {
    $.ajax({
      type: "DELETE",
      url: `http://localhost:3000/api/bookmarks/${postId}`
    }).then(() => this.fetchBookmarkedPosts())
  }

  public componentDidMount() {
    this.initializeClipboard();
    this.fetchBookmarkedPosts();
  }

  public initializeClipboard() {
    var clipboard = new Clipboard('.btn');
    clipboard.on('success', function(e) {
      $(e.trigger).text("copied!")
      setTimeout(function(){ $(e.trigger).text("Copy Link"); }, 1000)
      e.clearSelection();
    });
  }

  public renderListItems() {
    return this.state.bookmarkedPosts.map(bookmarkedPost => (
      <tr key={`post${bookmarkedPost.id}`}>
        <td><a href={`#/posts/${bookmarkedPost.id}`} ><img className="img img-responsive img-thumbnail-size" src={bookmarkedPost.img_url1}/></a></td>
        <td className="hidden-xs"><a href={`#/posts/${bookmarkedPost.id}`} >{bookmarkedPost.title}</a></td>
        <td className="hidden-xs">{shortenString(bookmarkedPost.description, 30)}</td>
        <td className="hidden-xs">${Number(bookmarkedPost.price).toLocaleString()}</td>
        <td className="hidden-xs">{timeFromNow(bookmarkedPost.created_at)}</td>
        <td className="hidden-xs">{bookmarkedPost.condition}</td>
        <td><button type="button" className="btn btn-xs btn-success" data-clipboard-text={`http://localhost:3000/#/posts/${bookmarkedPost.id}`}>Copy Link</button></td>
        <td><button type="button" className="btn btn-xs btn-danger" onClick={() => this.deleteBookmarkedPost(bookmarkedPost.id)}>Delete</button></td>
      </tr>
    ))
  }

  public render() {
    return (
      <div>
        <div className="container">
          <ul className="nav nav-tabs">
            <li role="presentation"><a href="#/dashboard/posts">Posts</a></li>
            <li role="presentation" className="active"><a href="#/dashboard/bookmarks">Bookmarks</a></li>
            <li role="presentation"><a href="#/dashboard/rfps">Alerts</a></li>
          </ul>
          <div>
            <div className="panel panel-default">
              <div className="panel-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Thumbnail</th>
                      <th className="hidden-xs">Title</th>
                      <th className="hidden-xs">Description</th>
                      <th className="hidden-xs">Price</th>
                      <th className="hidden-xs">Posting Date</th>
                      <th className="hidden-xs">Condition</th>
                      <th>Copy Link</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderListItems()}
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

export default Bookmarks;
