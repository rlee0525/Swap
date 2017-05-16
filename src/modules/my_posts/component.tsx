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
    this.sortBy = this.sortBy.bind(this);
    this.state = {
      myPosts: [],
      title: -1,
      description: -1,
      price: -1,
      course: -1,
      created_at: -1,
      condition: -1
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

  public sortBy(key) {
    let polarity = this.state[key];
    let newArray = this.state.myPosts.sort(function(a, b) {
      if (a[key] < b[key]) return (-1 * polarity);
      if (a[key] > b[key]) return (1 * polarity);
      return 0;
    })
    let newPolarity = (polarity === -1 ? 1 : -1);
    this.setState({
      myPosts: newArray,
      [key]: newPolarity
    });
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
                  <th className="hidden-xs">Title<a onClick={() => this.sortBy("title")} className="btn btn-xs" ><span className="caret" /></a></th>
                  <th className="hidden-xs">Description<a onClick={() => this.sortBy("description")} className="btn btn-xs" ><span className="caret" /></a></th>
                  <th className="hidden-xs">Price<a onClick={() => this.sortBy("price")} className="btn btn-xs" ><span className="caret" /></a></th>
                  <th className="hidden-xs">Course<a onClick={() => this.sortBy("course")} className="btn btn-xs" ><span className="caret" /></a></th>
                  <th className="hidden-xs">Posting Date<a onClick={() => this.sortBy("created_at")} className="btn btn-xs" ><span className="caret" /></a></th>
                  <th className="hidden-xs">Condition<a onClick={() => this.sortBy("condition")} className="btn btn-xs" ><span className="caret" /></a></th>
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