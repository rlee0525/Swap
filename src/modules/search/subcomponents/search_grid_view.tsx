import React from 'react';
import { shortenString, timeFromNow } from 'helpers';
import { Pagination } from './';
declare var $;

interface Post {
  id: any;
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
  title: any;
  description: any;
  price: any;
  created_at: any;
  condition: any;
  results: any;
  maxPages: number;
  currentPage: number;
  posts: Post [];
}

class SearchGridView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
    let results = props.searchResult;
    let maxPages = props.searchResult.length > 0 ? Math.ceil(props.searchResult.length / 15) : 1;

    this.state = {
      title: -1,
      description: -1,
      price: -1,
      created_at: -1,
      condition: -1,
      results,
      maxPages: maxPages,
      currentPage: 1,
      posts: null
    };

    this.checkVerified = this.checkVerified.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    let results = nextProps.searchResult;
    let maxPages = Math.ceil(nextProps.searchResult.length / 15)
    this.setState({results, maxPages});
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
        const accessToken = (FB as any).getAccessToken();
        $.ajax({
          method: "GET",
          url: `api/users/${accessToken}`
        }).then(obj => {
          if (obj.edu_email_confirmed) {
            window.location.href = `#/posts/${id}`
          } else if (obj.edu_email === null) {
            $('#emailInputModal').modal('show');
          } else {
            $('#emailVerificationModal').modal('show');
          }
        }).fail(() => FB.logout(res => console.log(res)))
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
    let pageStart = (this.state.currentPage - 1) * 15;
    let pageEnd = this.state.currentPage * 15;

    return (
      <div>
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
          { this.state.results ? this.state.results.slice(pageStart, pageEnd).map(post => this.renderGridItem(post)) : null}
        </div>
        <Pagination that={this} maxPages={this.state.maxPages} currentPage={this.state.currentPage} />
      </div>
    );
  }
}

export { SearchGridView };
