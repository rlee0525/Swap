import React from 'react';
import { shortenString, timeFromNow } from 'helpers';
import { PostForm } from 'modules/post/subcomponents';

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
    this.getMyPosts = this.getMyPosts.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.renderMyPosts = this.renderMyPosts.bind(this);
    this.state = {
      myPosts: []
    }
  }

  public componentDidMount() {
    this.getMyPosts();
  }

  public getMyPosts() {
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/api/posts"
    }).then(myPosts => this.setState({myPosts}))
  }

  public editPost(id) {
    $.ajax({
      method: "GET",
      url: `http://localhost:3000/api/posts/${id}`
    }).then(myPost => this.setState({myPost}))
  }

  public deletePost(id) {
    $.ajax({
      type: "DELETE",
      url: `http://localhost:3000/api/posts/${id}`
    }).then(() => this.getMyPosts();)
  }

  public renderListItem() {
    return this.state.myPosts.map(myPost => (
      <tr key={myPost.id}>
        <td><a href={`#/posts/${myPost.id}`} ><img className="img img-responsive img-thumbnail-size" src={myPost.img_url1}/></a></td>
        <td className="hidden-xs"><a href={`#/posts/${myPost.id}`}>{myPost.title}</a></td>
        <td className="hidden-xs">{shortenString(myPost.description, 30)}</td>
        <td className="hidden-xs">${Number(myPost.price).toLocaleString()}</td>
        <td className="hidden-xs">{myPost.course}</td>
        <td className="hidden-xs">{timeFromNow(myPost.created_at)}</td>
        <td className="hidden-xs">{myPost.condition}</td>
        <td><a type="button" className="btn btn-xs btn-success" href={`#/posts/edit/${myPost.id}`}>Edit</a></td>
        <td><button type="button" className="btn btn-xs btn-danger" onClick={() => this.deletePost(myPost.id)}>Delete</button></td>
      </tr>
    ))
  }

  public renderMyPosts() {
    return (
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
                  <th className="hidden-xs">Course</th>
                  <th className="hidden-xs">Posting Date</th>
                  <th className="hidden-xs">Condition</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.renderListItem()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="container">
          <ul className="nav nav-tabs">
            <li role="presentation" className="active"><a href="#/dashboard/posts">Posts</a></li>
            <li role="presentation"><a href="#/dashboard/bookmarks">Bookmarks</a></li>
            <li role="presentation"><a href="#/dashboard/rfps">Alerts</a></li>
            <div>
              <a href="#/posts/create" className="btn btn-success nav-button" >Create Post</a>
            </div>
          </ul>
          {this.renderMyPosts()}
        </div>
      </div>
    )
  }
}

export default MyPosts;
