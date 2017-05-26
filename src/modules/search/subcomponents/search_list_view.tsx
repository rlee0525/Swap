import React from 'react';
import { shortenString,
         timeFromNow,
         getCategory } from 'helpers';
import { IPost } from 'common/interfaces';
import { Pagination } from './';
import { merge } from 'lodash';
declare var $;

interface Props {
  searchResult: any;
  search: (query: object) => JQueryXHR;
  saveQuery: any;
  currentQuery: any;
}

interface State {
}

class SearchListView extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      price: -1,
      updated_at: 1,
      views: 1
    }

    this.sort_by = this.sort_by.bind(this);
  }

  public componentWillMount() {
    const currentQuery = this.props.currentQuery;
    this.props.search(currentQuery);
  }

  renderListItem(post: IPost, idx: number) {
    return (
      <tr key={idx} onClick={() => window.location.href = `#/posts/${post.id}`}>
        <td>{post.title}</td>
        <td className="hidden-xs">{shortenString(post.description, 30)}</td>
        <td>${Number(post.price).toLocaleString()}</td>
        <td className="hidden-xs">{timeFromNow(post.updated_at)}</td>
        <td className="hidden-xs">{post.views}</td>
      </tr>
    )
  }

  public sort_by(sort_by: string) {
    const polarity = this.state[sort_by] * -1;

    const currentQuery = this.props.currentQuery;
    this.props.saveQuery({sort_by, polarity});
    const nextQuery = merge({}, currentQuery, {sort_by, polarity})
    this.props.search(nextQuery);

    this.setState({[sort_by]: polarity})
  }

  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th className="hidden-xs">Description</th>
              <th onClick={() => this.sort_by("price")}>Price<a className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
              <th onClick={() => this.sort_by("updated_at")} className="hidden-xs">Posted<a className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
              <th onClick={() => this.sort_by("views")} className="hidden-xs">Views<a className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
            </tr>
          </thead>
          <tbody>
            { this.props.searchResult.posts.map((post, idx) => this.renderListItem(post, idx)) }
          </tbody>
        </table>
      </div>
    )
  }
}

export { SearchListView };
