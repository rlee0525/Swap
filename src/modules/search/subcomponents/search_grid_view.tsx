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

  preventPropagation(e) {
    e.stopPropagation();
  }

  renderGridItem(post: IPost) {
    const frames = [post.img_url1, post.img_url2, post.img_url3].filter(el => el !== null)
    const carouselFrames = frames.map((el, idx) => (
      <div className={`item ${idx == 0 ? "active" : ""}`}>
        <img src={el} />
      </div>
    ))

    let carouselControls = (
      <div>
        <a className="left carousel-control" href={`#carousel-example-generic-${post.id}`} role="button" data-slide="prev"
         onClick={this.preventPropagation}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href={`#carousel-example-generic-${post.id}`} role="button" data-slide="next"
          onClick={this.preventPropagation}>>
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    )

    if (!post.img_url2) carouselControls = null;

    const carousel = (
      <div id={`carousel-example-generic-${post.id}`} className="carousel slide" data-ride="carousel">

        <div className="carousel-inner" role="listbox">
          {carouselFrames}
        </div>

        {carouselControls}
      </div>
    )

    let updatedDate: number | string= Date.parse(post.updated_at);
    updatedDate = Date.now() - updatedDate <= 86400000 ? timeFromNow(post.updated_at) : "";

    return (
      <div className="col-sm-4 col-md-3" key={Math.random() * post.id}
        onClick={() => window.location.href = `#/posts/${post.id}`}>
        <div className="thumbnail thumbnail-post col-md-12">
          {carousel}
          <div className="thumbnail-caption-top-right">{updatedDate}</div>
          <div className="caption" id="grid-caption">
            <span id="grid-title">{post.title}</span>
            <span className="bottom-right-corner">${Number(post.price).toLocaleString()}</span>
            <span className="bottom-left-corner">
              <img className="img-circle" src={post.seller_fb_picture}/>
              {post.seller_name}
            </span>
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
