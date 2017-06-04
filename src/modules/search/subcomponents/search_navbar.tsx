import React from 'react';
import { searchParams } from 'helpers';
import { merge } from 'lodash';
import { getCategory } from 'helpers';
declare var window;

interface Props {
  search(query: object) : void;
  searchResult: any;
  currentQuery: any;
  saveQuery: any;
  home: any;
  user: any;
}

interface State {
  category: any;
}

class SearchNavbar extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.checkKey = this.checkKey.bind(this);
    this.renderCategoryMenu = this.renderCategoryMenu.bind(this);
    this.enterSearchQuery = this.enterSearchQuery.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { category: null };
  }

  private checkKey(e: any) {
    if (e.keyCode === 13) {
      this.enterSearchQuery();
    }
  }

  private onChange(e: any) {
    let query = e.target.value;
    const currentQuery = this.props.currentQuery;
    let nextQuery = merge({}, currentQuery, {query});
    this.props.saveQuery(nextQuery)
    if (query === "") {
      if (this.props.currentQuery.category === "My Course Material" && this.props.user) {
        const access_token = this.props.user.auth.accessToken;
        nextQuery = merge({}, nextQuery, {access_token});
        this.props.search(nextQuery);
      } else {
        this.props.search(nextQuery);
      }
    }
  }

  private enterSearchQuery() {
    $('#search-query').blur();
    const currentQuery = this.props.currentQuery;
    if (this.props.home) {
      let newLocation;
      let oldLocation = currentQuery.category;
      if (oldLocation === "All") {
        newLocation = "recent"
      } else if (oldLocation === "Lost & Found") {
        newLocation = "lostandfound"
      } else {
        newLocation = oldLocation.toLowerCase().split(" ").join("");
      }
      window.location = `#/${newLocation}`;
    }
    let nextQuery = merge({}, currentQuery, {page_idx: 1});
    const category = this.state.category;
    if (this.state.category) nextQuery = merge({}, currentQuery, {category});
    this.props.saveQuery(nextQuery);
    if (this.props.currentQuery.category === "My Course Material" && this.props.user) {
      const access_token = this.props.user.auth.accessToken;
      nextQuery = merge({}, nextQuery, {access_token});
      this.props.search(nextQuery);
    } else {
      this.props.search(nextQuery);
    }
  }

  private renderCategoryMenu(label) {
    this.setState({category: label})
    // const currentQuery = this.props.currentQuery;
    // let nextQuery = merge({}, currentQuery, {category: label, page_idx: 1});
    // this.props.saveQuery(nextQuery);
    // if (label === "My Course Material" && this.props.user) {
    //   const access_token = this.props.user.auth.accessToken;
    //   nextQuery = merge({}, nextQuery, {access_token});
    //   this.props.search(nextQuery);
    // } else {
    //   this.props.search(nextQuery);
    // }
    $('#search-query').focus();
  }

  public render() {
    return (
      <div className="container" id="search-navbar-container">
        <div className="row">
          <div className="dropdown col-md-2" id="no-padding-left">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              {this.state.category || this.props.currentQuery.category}
              <span className="caret" id="special-caret"></span>
            </button>
            <ul className="dropdown-menu col-md-2" aria-labelledby="dropdownMenu1">
              <li><a onClick={() => this.renderCategoryMenu("All")}>All</a></li>
              <li><a onClick={() => this.renderCategoryMenu("Course Material")}>Course Material</a></li>
              <li><a onClick={() => this.renderCategoryMenu("Furniture")}>Furniture</a></li>
              <li><a onClick={() => this.renderCategoryMenu("Clothing")}>Clothing</a></li>
              <li><a onClick={() => this.renderCategoryMenu("Electronics")}>Electronics</a></li>
              <li><a onClick={() => this.renderCategoryMenu("Housing")}>Housing</a></li>
              <li><a onClick={() => this.renderCategoryMenu("Bikes")}>Bikes</a></li>
              <li><a onClick={() => this.renderCategoryMenu("Games")}>Games</a></li>
              <li><a onClick={() => this.renderCategoryMenu("Others")}>Others</a></li>
              <li><a onClick={() => this.renderCategoryMenu("Lost & Found")}>Lost & Found</a></li>
              <li className={this.props.user ? "" : "hidden"}><a onClick={() => this.renderCategoryMenu("My Course Material")}>My Course Material</a></li>
            </ul>
          </div>
          <div className="input-group col-md-10 col-sm-12 col-xs-8" id="phone-search-nav">
            <input id="search-query" type="text" className="form-control" placeholder="Search" onChange={e => this.onChange(e)}
                  onKeyDown={e => this.checkKey(e)} value={this.props.currentQuery.query} />
            <span className="input-group-addon search-icon" id="basic-addon2" onClick={this.enterSearchQuery}><span className="glyphicon glyphicon-search" aria-hidden="true" /></span>
          </div>
        </div>
      </div>
    );
  }
}

export { SearchNavbar };
