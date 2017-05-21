import React from 'react';
import { shortenString, timeFromNow, IPost } from 'helpers';
import { Pagination } from './';
declare var $;

interface Props {
  searchResult: IPost [];
}

interface State {
  results: IPost[];
  title?: number;
  description?: number;
  price?: number;
  created_at?: number;
  condition?: number;
  maxPages?: number;
  currentPage?: number;
  views?: number;
  firstTime?: number;
}

class SearchListView extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
    let results = props.searchResult;
    let maxPages = Math.ceil(props.searchResult.length / 10);

    this.state = {
      title: -1,
      description: -1,
      price: -1,
      created_at: -1,
      condition: -1,
      views: -1,
      currentPage: 1,
      results,
      posts: null,
      maxPages
    };

    this.checkVerified = this.checkVerified.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    let results = nextProps.searchResult;
    let maxPages = Math.ceil(nextProps.searchResult.length / 10)
    this.setState({results, maxPages});
  }

  public checkVerified(id:number) {
    (FB as any).getLoginStatus(function(response) {
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

  renderListItem(post: IPost, idx: number) {
    return (
      <tr key={idx} onClick={() => this.checkVerified(post.id)}>
        <td>{post.title}</td>
        <td className="hidden-xs" id="hide-description">{shortenString(post.description, 30)}</td>
        <td>${Number(post.price).toLocaleString()}</td>
        <td className="hidden-xs">{timeFromNow(post.created_at)}</td>
        <td className="hidden-xs">{post.condition}</td>
        <td className="hidden-xs">{post.views}</td>
      </tr>
    )
  }

  public sortBy(key:string) {
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

  render() {
    let pageStart = (this.state.currentPage - 1) * 10;
    let pageEnd = this.state.currentPage * 10;

    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th onClick={() => this.sortBy("title")}>Title<a onClick={() => this.sortBy("title")} className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
              <th onClick={() => this.sortBy("description")} className="hidden-xs" id="hide-description">Description<a onClick={() => this.sortBy("description")} className="btn btn-xs" id="caret-container"><span className="caret" /></a></th>
              <th onClick={() => this.sortBy("price")}>Price<a onClick={() => this.sortBy("price")} className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
              <th onClick={() => this.sortBy("created_at")} className="hidden-xs">Posted<a onClick={() => this.sortBy("created_at")} className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
              <th onClick={() => this.sortBy("condition")} className="hidden-xs">Condition<a onClick={() => this.sortBy("condition")} className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
              <th onClick={() => this.sortBy("views")} className="hidden-xs">Views<a onClick={() => this.sortBy("views")} className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
            </tr>
          </thead>
          <tbody>
            { this.state.results ? this.state.results.slice(pageStart, pageEnd).map((post,idx) => this.renderListItem(post, idx)) : null }
          </tbody>
        </table>
        <Pagination that={this} maxPages={this.state.maxPages} currentPage={this.state.currentPage} />
      </div>
    )
  }
}

export { SearchListView };
