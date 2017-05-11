import React from 'react';
import { shortenString, timeFromNow } from 'helpers';

interface Props {
}

interface State {
}

class SearchListView extends React.Component<Props, State> {
  renderListItem(post, idx) {
    return (
      <tr key={idx}>
        <td>{post.title}</td>
        <td>{shortenString(post.description, 30)}</td>
        <td>${Number(post.price).toLocaleString()}</td>
        <td>{timeFromNow(post.created_at)}</td>
        <td>{post.condition}</td>
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Posting Date</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          { this.props.searchResult ? this.props.searchResult.map((post,idx) => this.renderListItem(post, idx)) : null }
        </tbody>
      </table>
    )
  }
}

export { SearchListView };
