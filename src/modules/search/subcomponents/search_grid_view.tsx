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

class SearchGridView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
    let results = props.searchResult;
    this.state = {
      title: -1,
      description: -1,
      price: -1,
      created_at: -1,
      condition: -1,
      results
    };

    this.checkVerified = this.checkVerified.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    let results = nextProps.searchResult;
    this.setState({results});
  }

  buttonClass(condition: string) {
    if (condition === 'New') {
      return 'success';
    } else if (condition === 'Like New') {
      return 'primary';
    } else {
      return 'info';
    }
  }

  public checkVerified(id) {
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        const accessToken = FB.getAccessToken();
        $.ajax({
          method: "GET",
          url: `http://localhost:3000/api/users/${accessToken}`
        }).then(obj => {
          if (obj.edu_email_confirmed) {
            window.location.href = `#/posts/${id}`
          } else if (obj.edu_email === null) {
            $('#emailInputModal').modal('show');
          } else {
            $('#emailVerificationModal').modal('show');
          }
        }).fail(() => FB.logout())
      } else {
        $('#logInModal').modal('show');
      }
    });
  }

  public sortBy(key) {
    let polarity = this.state[key];
    let newArray = this.state.results.sort(function(a:object, b:object) {
      if (a[key] < b[key]) return (-1 * polarity);
      if (a[key] > b[key]) return (1 * polarity);
      return 0;
    });
    let newPolarity = (polarity === -1 ? 1 : -1);
    this.setState({
      posts: newArray,
      [key]: newPolarity
    });
  }

  renderGridItem(post: Post) {
    return (
      <div className="thumbnail col-sm-6 col-md-4" key={Math.random() * post.id} onClick={() => this.checkVerified(post.id)}>
        <a id={post.id}>
          <img src={post.img_url1} alt={post.title} />
          <div className="thumbnail-caption">{timeFromNow(post.created_at)}</div>
        </a>
        <div className="caption">
          <span className={`label label-${this.buttonClass(post.condition)}`}>{post.condition}</span>
          <h3>{post.title}</h3>
          <p>{shortenString(post.description, 160)}</p>
          <div className="grid-bottom">
            <h3>${Number(post.price).toLocaleString()}</h3>
            <a className="btn btn-success btn-lg btn-block">Go to Page</a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="row">
        <div className="sort-by-panel">
          <div className="btn-group">
            <button type="button" className="btn btn-default btn-md dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort By <span className="caret"></span>
            </button>
            <ul className="dropdown-menu dropdown-menu-right">
              <li><a onClick={() => this.sortBy("title")} >Title</a></li>
              <li><a onClick={() => this.sortBy("description")} >Description</a></li>
              <li><a onClick={() => this.sortBy("price")} >Price</a></li>
              <li><a onClick={() => this.sortBy("created_at")} >Posting Date</a></li>
              <li><a onClick={() => this.sortBy("condition")} >Condition</a></li>
            </ul>
          </div>
        </div>
        { this.state.results ? this.state.results.map(post => this.renderGridItem(post)) : null }
      </div>
    );
  }
}

export { SearchGridView };
