import React from 'react';
import { shortenString } from 'helpers';

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

  buttonClass(condition: string) {
    if (condition === 'New') {
      return 'success';
    } else if (condition === 'Like New') {
      return 'primary';
    } else {
      return 'info';
    }
  }

  renderGridItem(post: Post) {
    return (
      <div className="thumbnail col-sm-6 col-md-4" key={Math.random() * post.id}>
        <img src={post.img_url1} alt={post.title} />
        <div className="caption">
          <span className={`label label-${this.buttonClass(post.condition)}`}>{post.condition}</span>
          <h3>{post.title}</h3>
          <p>{shortenString(post.description, 160)}</p>
          <h3>${Number(post.price).toLocaleString()}</h3>
          <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
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