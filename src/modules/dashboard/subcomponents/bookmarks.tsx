import React from 'react';
import Clipboard from 'clipboard';
import autoBind from 'react-autobind';
import { IUser, IPost } from 'common/interfaces';
import { shortenString, timeFromNow } from 'helpers';
import { TableHeaders, LoadingSpinner, SmallButton } from 'common/components';

declare var $, window;

interface State {
  bookmarks: IPost [];
  title: number;
  price: number;
  updated_at: number;
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
      price: -1,
      updated_at: -1
    }

    autoBind(this);
  }

  public deleteBookmark(e, id) {
    e.stopPropagation();
    let that = this;

    $(function() {
      $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Yes": function() {
            $(this).dialog("close");
            let { deleteBookmark, user } = that.props;

            deleteBookmark(id, user.auth.accessToken).then(
              () => that.setState({ bookmarks: that.props.bookmarks.list })
            );
          },
          Cancel: function() {
            $(this).dialog("close");
          }
        }
      });
    });
  }

  public componentDidMount() {
    this.initializeClipboard();

    let { bookmarks, user, fetchBookmarks } = this.props;

    fetchBookmarks(user.auth.accessToken).then(
      () => this.setState({ bookmarks: this.props.bookmarks.list })
    );
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
    if (!this.props.bookmarks.fetched) return <LoadingSpinner />;
    if (this.props.bookmarks.list.length === 0) return <tr><td colSpan={6}>No bookmarks added.</td></tr>;

    return (
      this.state.bookmarks.map(bookmarkedPost => (
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
            <button 
              type="button" 
              className="btn btn-xs btn-primary" 
              data-clipboard-text={window.localhost_url + `/#/posts/${bookmarkedPost.id}`} 
              onClick={e => e.stopPropagation()}
            >
              Copy Link
            </button>
          </td>

          <td>
            <SmallButton 
              type="Delete" 
              class="btn-secondary" 
              click={(e) => this.deleteBookmark(e, bookmarkedPost.id)}
            />
          </td>
        </tr>
      ))
    );
  }

  public render() {
    const headers = ['title', 'price', 'updated_at'];

    return (
      <div className="panel panel-default">
        <div className="dashboard-description">
          Add bookmarks to keep track of items you like and to share them with others.
        </div>

        <div className="panel-body">
          <table className="table table-hover">
            <TableHeaders context={this} array={this.state.bookmarks} headers={headers} />
            <tbody>
              {this.renderListItems()}
            </tbody>
          </table>
        </div>

        <div className="no-display" id="dialog-confirm">
          Delete this post?
        </div> 
      </div>
    );
  }
}

export { Bookmarks };
