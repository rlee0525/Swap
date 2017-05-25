import React from 'react';
import Clipboard from 'clipboard';
import { IUser, IPost } from 'common/interfaces';
import { TableHeaders } from 'common/components';
import { shortenString, timeFromNow } from 'helpers';
declare var window;

interface State {
  bookmarks: IPost [];
  title: any;
  description: any;
  price: any;
  updated_at: any;
}

interface Props {
  user: IUser;
  bookmarks: {
    fetched: boolean;
    list: IPost[];
  };
  fetchBookmarks : (accessToken: string) => JQueryPromise<void>;
  deleteBookmark : (id: number, accessToken: string) => JQueryPromise<void>;
}

class Bookmarks extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      bookmarks: props.bookmarks.list,
      title: -1,
      description: -1,
      price: -1,
      updated_at: -1
    }

    this.initializeClipboard = this.initializeClipboard.bind(this);
    // this.deleteBookmarkedPost = this.deleteBookmarkedPost.bind(this);
  }

  public deleteBookmark(e, id) {
    e.stopPropagation();

    let { deleteBookmark, user } = this.props;

    deleteBookmark(id, user.auth.accessToken).then(
      () => this.setState({ bookmarks: this.props.bookmarks.list })
    );
  }

  public componentDidMount() {
    this.initializeClipboard();

    let { bookmarks, user, fetchBookmarks } = this.props;

    if (!bookmarks.fetched) {
      fetchBookmarks(user.auth.accessToken).then(
        () => this.setState({ bookmarks: this.props.bookmarks.list })
      );
    }
  }

  public initializeClipboard() {
    var clipboard = new Clipboard('.btn');
    clipboard.on('success', function(e) {
      $(e.trigger).text("copied!");
      setTimeout(function(){ $(e.trigger).text("Copy Link"); }, 1000);
      e.clearSelection();
    });
  }

  public loadPost(id) {
    window.location.href = `#/posts/${id}`;
  }

  private renderListItems() {
    return this.props.bookmarks.list.map(bookmarkedPost => (
      <tr key={`post${bookmarkedPost.id}`} onClick={() => this.loadPost(bookmarkedPost.id)}>
        <td>
          <a href={`#/posts/${bookmarkedPost.id}`} >
            <img className="img img-responsive img-thumbnail-size" src={bookmarkedPost.img_url1}/>
          </a>
        </td>

        <td className="hidden-xs">{shortenString(bookmarkedPost.title, 25)}</td>
        <td className="hidden-xs">${Number(bookmarkedPost.price).toLocaleString()}</td>
        <td className="hidden-xs">{timeFromNow(bookmarkedPost.updated_at)}</td>

        <td>
          <button type="button" className="btn btn-xs btn-primary" data-clipboard-text={window.localhost_url + `/#/posts/${bookmarkedPost.id}`} onClick={e => e.stopPropagation()}>
            Copy Link
          </button>
        </td>

        <td>
          <button type="button" className="btn btn-xs btn-secondary" onClick={(e) => this.deleteBookmark(e, bookmarkedPost.id)}>
            Delete
          </button>
        </td>
      </tr>
    ))
  }

  public render() {
    const headers = ['title', 'price', 'updated_at'];

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <table className="table table-hover">
            <TableHeaders context={this} array={this.state.bookmarks} headers={headers} />

            <tbody>
              {this.renderListItems()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export { Bookmarks };
