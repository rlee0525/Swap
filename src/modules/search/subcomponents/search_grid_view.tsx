import React from 'react';
import { shortenString,
         timeFromNow,
         getCategory } from 'helpers';
import { IPost } from 'common/interfaces';
import { Pagination } from './';
import { merge } from 'lodash';
declare var $;

interface Props {
  searchResult: IPost [];
  search: (query: object) => JQueryXHR;
  location: string;
  props: any;
}

interface State {
  results: IPost[];
  maxPages: number;
  sort_by: string;
  page_idx: number;
}

class SearchGridView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    let results = props.searchResult.posts;
    let maxPages = props.searchResult.max_pages;

    this.state = {
      results,
      maxPages,
      page_idx: 1,
      sort_by: "Posting Date"
    };

    this.sort_by = this.sort_by.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    let results = nextProps.searchResult.posts;
    let maxPages = nextProps.searchResult.max_pages;
    this.setState({ results, maxPages });
  }

  // OLD CODE Consider Deleting
  // private buttonClass(condition: string) {
  //   if (condition === 'Brand New') {
  //     return 'info';
  //   } else if (condition === 'Like New') {
  //     return 'primary';
  //   } else {
  //     return 'success';
  //   }
  // }

  public sort_by(sort_by: string, polarity: number) {
    const currentQuery = this.props.props.currentQuery;
    const nextQuery = merge({}, currentQuery, {sort_by, polarity});
    this.props.props.saveQuery(nextQuery);
    this.props.props.search(nextQuery);
  }

  renderGridItem(post: IPost) {
    let updatedDate: number | string= Date.parse(post.updated_at);
    updatedDate = Date.now() - updatedDate <= 86400000 ? timeFromNow(post.updated_at) : "";

    return (
      <div className="col-sm-6 col-md-3" key={Math.random() * post.id}
           onClick={() => window.location.href = `#/posts/${post.id}`}>
        <div className="thumbnail col-md-12">
          <a id={post.id}>
            <img src={post.img_url1} alt={post.title} />
            <div className="thumbnail-caption-top-right">{updatedDate}</div>
          </a>
          <div className="caption" id="grid-caption">
            <span id="grid-title">{post.title}</span>
            <span className="bottom-right-corner">${Number(post.price).toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="sort-by-panel">
            <div className="btn-group">
              <button type="button" className="btn btn-default btn-md dropdown-toggle btn-special-size" id="margin-right" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.props.props.currentQuery.sort_by}&nbsp;&nbsp;<span className="caret"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li><a onClick={() => this.sort_by("views", -1)}>Popularity</a></li>
                <li><a onClick={() => this.sort_by("updated_at", -1)}>Posting Date</a></li>
                <li><a onClick={() => this.sort_by("price", 1)}>Price: Low to High</a></li>
                <li><a onClick={() => this.sort_by("price", -1)}>Price: High to Low</a></li>
              </ul>
            </div>
          </div>
          { this.props.props.searchResult.posts ? this.props.props.searchResult.posts.map(post => this.renderGridItem(post)) : null}
        </div>
        <Pagination props={this.props.props} maxPages={this.props.props.searchResult.max_pages} currentPage={this.props.props.currentQuery.page_idx} />
      </div>
    );
  }
}

export { SearchGridView };
