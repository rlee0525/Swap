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

    this.checkVerified = this.checkVerified.bind(this);
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
          <h3>${Number(post.price).toLocaleString()}</h3>
          <a className="btn btn-success btn-lg btn-block">Go to Page</a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="row">
        { this.props.searchResult ? this.props.searchResult.map(post => this.renderGridItem(post)) : null }
      </div>
    );
  }
}

export { SearchGridView };
