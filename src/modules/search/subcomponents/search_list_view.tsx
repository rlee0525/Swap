import React from 'react';
import { shortenString, timeFromNow } from 'helpers';
import { IPost } from 'common/interfaces';
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
  updated_at?: number;
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
      updated_at: -1,
      condition: -1,
      views: -1,
      currentPage: 1,
      results,
      posts: null,
      maxPages
    };
  }

  public componentWillReceiveProps(nextProps) {
    let results = nextProps.searchResult;
    let maxPages = Math.ceil(nextProps.searchResult.length / 10)
    this.setState({results, maxPages});
  }

  renderListItem(post: IPost, idx: number) {
    return (
      <tr key={idx} onClick={() => window.location.href = `#/posts/${post.id}`}>
        <td>{post.title}</td>
        <td className="hidden-xs" id="hide-description">{shortenString(post.description, 30)}</td>
        <td>${Number(post.price).toLocaleString()}</td>
        <td className="hidden-xs">{timeFromNow(post.updated_at)}</td>
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
              <th onClick={() => this.sortBy("updated_at")} className="hidden-xs">Posted<a onClick={() => this.sortBy("updated_at")} className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
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
