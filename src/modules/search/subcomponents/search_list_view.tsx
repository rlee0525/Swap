import React from 'react';
import { shortenString, 
         timeFromNow,
         getCategory } from 'helpers';
import { IPost } from 'common/interfaces';
import { Pagination } from './';
declare var $;

interface Props {
  searchResult: IPost [];
  search: (query: object) => JQueryXHR;
  location: string;
}

interface State {
  results: IPost[];
  maxPages?: number;
  pageIdx?: number;
  currentPage?: number;
}

class SearchListView extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
    let results = props.searchResult;
    let maxPages = Math.ceil(props.searchResult.length / 10);

    this.state = {
      results,
      maxPages,
      pageIdx: 1,
      currentPage: 1,
      polarity: -1
    };

    this.sortBy = this.sortBy.bind(this);
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

  public sortBy(key: string, polarity: number) {
    let sortBy;
    polarity *= -1;

    if (key == "views") {
      sortBy = "Views";
    } else if (key == "updated_at") {
      sortBy = "Posting Date"
    } else {
      sortBy = "Price"
    }

    let query = "";
    let category = getCategory(this.props.location);
    let sort_by = sortBy;
    let page_idx = this.state.pageIdx;

    let searchParams = { query, category, sort_by, polarity, page_idx };

    this.props.search(searchParams).then(results => {
      this.setState({
        results: results.result,
        sortBy,
        polarity
      });
    })
  }

  render() {
    let pageStart = (this.state.currentPage - 1) * 10;
    let pageEnd = this.state.currentPage * 10;
    let polarity = this.state.polarity;

    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th onClick={() => this.sortBy("price", polarity)}>Price<a onClick={() => this.sortBy("price", polarity)} className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
              <th onClick={() => this.sortBy("updated_at", polarity)} className="hidden-xs">Posted<a onClick={() => this.sortBy("updated_at", polarity)} className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
              <th onClick={() => this.sortBy("views", polarity)} className="hidden-xs">Views<a onClick={() => this.sortBy("views", polarity)} className="btn btn-xs" id="caret-container" ><span className="caret" /></a></th>
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
