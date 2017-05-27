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
  user: any;
}

interface State {
}

class SearchGridView extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.sort_by = this.sort_by.bind(this);
    this.translateSortLabels = this.translateSortLabels.bind(this);
  }

  public componentWillMount() {
    let nextQuery = this.props.currentQuery;
    if (this.props.currentQuery.category === "My Course Material" && this.props.user) {
      const access_token = this.props.user.auth.accessToken;
      nextQuery = merge({}, nextQuery, {access_token});
      this.props.search(nextQuery);
    } else {
      this.props.search(nextQuery);
    }
  }

  public sort_by(sort_by: string, polarity: number) {
    const currentQuery = this.props.currentQuery;
    this.props.saveQuery({sort_by, polarity});
    let nextQuery = merge({}, currentQuery, {sort_by, polarity})
    if (this.props.currentQuery.category === "My Course Material" && this.props.user) {
      const access_token = this.props.user.auth.accessToken;
      nextQuery = merge({}, nextQuery, {access_token});
      this.props.search(nextQuery);
    } else {
      this.props.search(nextQuery);
    }
  }

  renderGridItem(post: IPost) {
    let updatedDate: number | string= Date.parse(post.updated_at);
    updatedDate = Date.now() - updatedDate <= 86400000 ? timeFromNow(post.updated_at) : "";

    return (
      <div className="col-sm-4 col-md-3" key={Math.random() * post.id}
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

  private translateSortLabels() {
    const label = this.props.currentQuery.sort_by;
    const polarity = this.props.currentQuery.polarity;
    if (label == "views") {
      return "Popularity";
    } else if (label == "updated_at") {
      return "Posting Date"
    } else if (label == "price" && polarity === -1) {
      return "Price: Low to High"
    } else if (label == "price" && polarity === 1) {
      return "Price: High to Low"
    }
    return null
  }


  render() {
    return (
      <div>
        <div className="row">
          <div className="sort-by-panel">
            <div className="btn-group">
              <button type="button" className="btn btn-default btn-md dropdown-toggle btn-special-size" id="margin-right" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {this.translateSortLabels()}&nbsp;&nbsp;<span className="caret"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li><a onClick={() => this.sort_by("views", -1)}>Popularity</a></li>
                <li><a onClick={() => this.sort_by("updated_at", -1)}>Posting Date</a></li>
                <li><a onClick={() => this.sort_by("price", 1)}>Price: Low to High</a></li>
                <li><a onClick={() => this.sort_by("price", -1)}>Price: High to Low</a></li>
              </ul>
            </div>
          </div>
          { this.props.searchResult.posts.map(post => this.renderGridItem(post)) }
        </div>
      </div>
    );
  }
}

export { SearchGridView };
