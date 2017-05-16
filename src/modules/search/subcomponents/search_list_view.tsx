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

class SearchListView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
    let results = this.props.searchResult;
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

  public sortBy(key) {
    let polarity = this.state[key];
    let newArray = this.state.results.sort(function(a, b) {
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
    return (
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
          { this.state.results ? this.state.results.map((post,idx) => this.renderListItem(post, idx)) : null }
        </tbody>
      </table>
    )
  }
}

export { SearchListView };
