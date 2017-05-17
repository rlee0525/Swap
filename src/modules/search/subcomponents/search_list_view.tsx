import React from 'react';
import { shortenString, timeFromNow } from 'helpers';
import { Pagination } from './';

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
      currentPage: 1,
      results,
      posts: null,
      maxPages
    };

    this.checkVerified = this.checkVerified.bind(this);
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
            ($ as any)('#emailInputModal').modal('show');
          } else {
            ($ as any)('#emailVerificationModal').modal('show');
          }
        }).fail(() => FB.logout(res => console.log(res)))
      } else {
        ($ as any)('#logInModal').modal('show');
      }
    });
  }

  renderListItem(post: Post, idx: number) {
    return (
      <tr key={idx} onClick={() => this.checkVerified(post.id)}>
        <td>{post.title}</td>
        <td className="hidden-xs">{shortenString(post.description, 30)}</td>
        <td>${Number(post.price).toLocaleString()}</td>
        <td className="hidden-xs">{timeFromNow(post.created_at)}</td>
        <td className="hidden-xs">{post.condition}</td>
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
              <th>Title<a onClick={() => this.sortBy("title")} className="btn btn-xs" ><span className="caret" /></a></th>
              <th className="hidden-xs">Description<a onClick={() => this.sortBy("description")} className="btn btn-xs" ><span className="caret" /></a></th>
              <th>Price<a onClick={() => this.sortBy("price")} className="btn btn-xs" ><span className="caret" /></a></th>
              <th className="hidden-xs">Posting Date<a onClick={() => this.sortBy("created_at")} className="btn btn-xs" ><span className="caret" /></a></th>
              <th className="hidden-xs">Condition<a onClick={() => this.sortBy("condition")} className="btn btn-xs" ><span className="caret" /></a></th>
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
