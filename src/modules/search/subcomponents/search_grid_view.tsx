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
  title?: number;
  description?: number;
  price?: number;
  updated_at?: number;
  condition?: number;
  maxPages?: number;
  currentPage?: number;
  views?: number;
  sortBy?: string;
  pageIdx?: number;
}

class SearchGridView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    let results = props.searchResult;
    let maxPages = props.searchResult.length > 0 ? Math.ceil(props.searchResult.length / 16) : 1;

    this.state = {
      results,
      maxPages,
      currentPage: 1,
      sortBy: "Posting Date",
      pageIdx: 1
    };

    this.sortBy = this.sortBy.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    let results = nextProps.searchResult;
    let maxPages = Math.ceil(nextProps.searchResult.length / 16)
    this.setState({results, maxPages});
  }

  private buttonClass(condition: string) {
    if (condition === 'Brand New') {
      return 'info';
    } else if (condition === 'Like New') {
      return 'primary';
    } else {
      return 'success';
    }
  }

  public sortBy(key: string, polarity: number) {
    let sortBy;

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
        sortBy
      });
    })
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
            <span id="grid-title">${Number(post.price).toLocaleString()}&nbsp; | &nbsp;{post.title}</span>

            <div className="grid-bottom">
              <span className={`label label-${this.buttonClass(post.condition)}`} id="label-micro">
                {post.condition}
              </span>
              <span className="red">
                <span className="glyphicon glyphicon-fire" id="condition-views-grid"></span>
                {post.views} Views
              </span>
            </div>
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
                {this.state.sortBy}&nbsp;&nbsp;<span className="caret"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li><a onClick={() => this.sortBy("views", -1)}>Popularity</a></li>
                <li><a onClick={() => this.sortBy("updated_at", -1)}>Posting Date</a></li>
                <li><a onClick={() => this.sortBy("price", 1)}>Price: Low to High</a></li>
                <li><a onClick={() => this.sortBy("price", -1)}>Price: High to Low</a></li>
              </ul>
            </div>
          </div>
          { this.state.results ? this.state.results.map(post => this.renderGridItem(post)) : null}
        </div>
        <Pagination that={this} maxPages={this.state.maxPages} currentPage={this.state.currentPage} />
      </div>
    );
  }
}

export { SearchGridView };
