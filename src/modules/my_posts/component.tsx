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
        <td><img className="img img-responsive img-thumbnail-size" src={myPost.img_url1}/></td>
        <td><a href={`#/posts/${myPost.id}`}>{myPost.title}</a></td>
        <td>{shortenString(myPost.description, 30)}</td>
        <td>${Number(myPost.price).toLocaleString()}</td>
        <td>{myPost.course}</td>
        <td>{timeFromNow(myPost.created_at)}</td>
        <td>{myPost.condition}</td>
        <td><button type="button" className="btn btn-xs btn-success" onClick={() => this.editPost(myPost.id)}>Edit</button></td>
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
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Course</th>
                  <th>Posting Date</th>
                  <th>Condition</th>
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
            <li role="presentation" className="active"><a href="#/myposts">Posts</a></li>
            <li role="presentation"><a href="#/mybookmarks">Bookmarks</a></li>
          </ul>
          { typeof this.state.myPost === "undefined" ? this.renderMyPosts() : <PostForm state={this.state.myPost} /> }
        </div>
      </div>
    )
  }
}

export default MyPosts;
