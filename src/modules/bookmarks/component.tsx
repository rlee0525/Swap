import React from 'react';
import Clipboard from 'clipboard';
import { shortenString, timeFromNow } from 'helpers';
declare var window;

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

interface State {
  bookmarkedPosts: Post [];
  title: any;
  description: any;
  price: any;
  created_at: any;
  condition: any;
}

class Bookmarks extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.initializeClipboard = this.initializeClipboard.bind(this);
    this.fetchBookmarkedPosts = this.fetchBookmarkedPosts.bind(this);
    this.deleteBookmarkedPost = this.deleteBookmarkedPost.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.state = {
      bookmarkedPosts: [],
      title: -1,
      description: -1,
      price: -1,
      created_at: -1,
      condition: -1
    }
  }

  public fetchBookmarkedPosts() {
    $.ajax({
      method: "GET",
      url: "api/bookmarks"
    }).then(bookmarkedPosts => this.setState({ bookmarkedPosts }))
  }

  public deleteBookmarkedPost(postId) {
    $.ajax({
      type: "DELETE",
      url: `api/bookmarks/${postId}`
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
        <td><button type="button" className="btn btn-xs btn-success" data-clipboard-text={window.localhost_url + `/#/posts/${bookmarkedPost.id}`}>Copy Link</button></td>
        <td><button type="button" className="btn btn-xs btn-danger" onClick={() => this.deleteBookmarkedPost(bookmarkedPost.id)}>Delete</button></td>
      </tr>
    ))
  }

  public sortBy(key) {
    let polarity = this.state[key];
    let newArray = this.state.bookmarkedPosts.sort(function(a: object, b: object) {
      if (a[key] < b[key]) return (-1 * polarity);
      if (a[key] > b[key]) return (1 * polarity);
      return 0;
    })
    let newPolarity = (polarity === -1 ? 1 : -1);
    this.setState({
      bookmarkedPosts: newArray,
      [key]: newPolarity
    });
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
                      <th className="hidden-xs">Title<a onClick={() => this.sortBy("title")} className="btn btn-xs" ><span className="caret" /></a></th>
                      <th className="hidden-xs">Description<a onClick={() => this.sortBy("description")} className="btn btn-xs" ><span className="caret" /></a></th>
                      <th className="hidden-xs">Price<a onClick={() => this.sortBy("price")} className="btn btn-xs" ><span className="caret" /></a></th>
                      <th className="hidden-xs">Posting Date<a onClick={() => this.sortBy("created_at")} className="btn btn-xs" ><span className="caret" /></a></th>
                      <th className="hidden-xs">Condition<a onClick={() => this.sortBy("condition")} className="btn btn-xs" ><span className="caret" /></a></th>
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
