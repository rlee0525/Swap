import React from 'react';
import { cloneDeep } from 'lodash';
import autoBind from 'react-autobind';
import { IPost, IUser } from 'common/interfaces';
import { shortenString, timeFromNow } from 'helpers';
import { TableHeaders, LoadingSpinner, Button } from 'common/components';

interface Props {
  user: IUser;
  myPosts: {
    fetched: boolean;
    list: IPost[];
  };
  fetchMyPosts : (accessToken: string) => JQueryPromise<void>;
  deleteMyPost : (id: number, accessToken: string) => JQueryPromise<void>;
}

interface State {
  myPosts: IPost [];
  title: number;
  price: number;
  course: number;
  updated_at: number;
}

class MyPosts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      myPosts: [],
      title: -1,
      price: -1,
      course: -1,
      updated_at: -1
    };

    autoBind(this);
  }

  public componentWillReceiveProps(newProps) {
    this.setState({ myPosts: newProps.myPosts.list })
  }

  public componentDidMount() {
    let { myPosts, user, fetchMyPosts } = this.props;

    if (!myPosts.fetched) {
      fetchMyPosts(user.auth.accessToken).then(
        () => this.setState({ myPosts: this.props.myPosts.list })
      );
    } else {
      this.setState({ myPosts: this.props.myPosts.list });
    }
  }

  public deletePost(e, id) {
    e.stopPropagation();

    let { deleteMyPost, user } = this.props;
    const access_token = this.props.user.auth.accessToken;

    deleteMyPost(id, user.auth.accessToken).then(
      () => this.setState({ myPosts: this.props.myPosts.list })
    );
  }

  public loadPost(id) {
    window.location.href = `#/posts/${id}`;
  }

  public editPost(e, id) {
    e.stopPropagation();

    window.location.href = `#/posts/edit/${id}`;
  }

  public toggleActivation(e, id, polarity, statePostId) {
    e.stopPropagation();

    let myPosts = cloneDeep(this.state.myPosts);
    let method = polarity == true ? "deactivate" : "activate";
    const access_token = this.props.user.auth.accessToken;

    $.ajax({
      type: "PATCH",
      url: `api/posts/${id}`,
      data: { access_token, method }
    }).then(
      () => {
        myPosts[statePostId].active = !myPosts[statePostId].active;
        this.setState({ myPosts });
      }
    );
  }

  public renderListItem() {
    if (!this.props.myPosts.fetched) return <LoadingSpinner />;
    if (this.props.myPosts.list.length === 0) return <tr><td colSpan={7}>No posts created.</td></tr>;

    return (
      this.state.myPosts.map((myPost, statePostId) => (
        <tr 
          key={myPost.id} 
          onClick={() => myPost.active ? this.loadPost(myPost.id) : null} 
          className={myPost.active ? "" : "disabled"}
        >
          <td>
            <img className="img img-responsive img-thumbnail-size" src={myPost.img_url1}/>
          </td>
          <td className="hidden-xs">{shortenString(myPost.title, 30)}</td>
          <td className="hidden-xs">${Number(myPost.price).toLocaleString()}</td>
          <td className="hidden-xs">{timeFromNow(myPost.updated_at)}</td>
          <td>
            <Button
              type="Edit"
              class="btn-primary"
              click={(e) => this.editPost(e, myPost.id)}
            />
          </td>
          <td>
            <Button
              type={myPost.active ? "Active" : "Inactive"}
              class={`${myPost.active ? "btn-primary" : "btn-warning"}`}
              click={(e) => this.toggleActivation(e, myPost.id, myPost.active, statePostId)}
            />
          </td>
          <td>
            <Button 
              type="Delete" 
              class="btn-secondary" 
              click={(e) => this.deletePost(e, myPost.id)}
            />
          </td>
        </tr>
      ))
    );
  }

  render() {
    let headers = ['title', 'price', 'updated_at'];
    
    return (
      <div className="panel panel-default">
        <div className="dashboard-description">
          Create posts to sell your items.
        </div>
        <div className="panel-body">
          <table className="table table-hover">
            <TableHeaders context={this} array={this.state.myPosts} headers={headers} />
            <tbody>
              {this.renderListItem()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export { MyPosts };
