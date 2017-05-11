import React from 'react';
import { shortenString } from 'helpers';

interface Props {
  search: object[];
}

interface State {

}

class SearchGridView extends React.Component<Props, State> {

  buttonClass(condition) {
    if (condition === 'New') {
      return 'success';
    } else if (condition === 'Like New') {
      return 'primary';
    } else {
      return 'info';
    }
  }

  renderGridItem(post) {
    return (
      <div className="thumbnail col-sm-6 col-md-4" key={Math.random() * post.id}>
        <img src={post.img_url1} alt={post.title} />
        <div className="caption">
          <span className={`label label-${this.buttonClass(post.condition)}`}>{post.condition}</span>
          <h3>{post.title}</h3>
          <p>{shortenString(post.description, 160)}</p>
          <h3>${Number(post.price).toLocaleString()}</h3>
          <a className="btn btn-success btn-lg btn-block" href={`/#/posts/${post.id}`}>Go to Page</a>
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
