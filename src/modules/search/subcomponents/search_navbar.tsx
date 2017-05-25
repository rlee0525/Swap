import React from 'react';
import { searchParams } from 'helpers';
import { merge } from 'lodash';
import { getCategory } from 'helpers';

interface Props {
  search(query: object) : void;
  props: any;
}

interface State {
  label: string;
  query: string;
}

class SearchNavbar extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      label: "All",
      query: ""
    }

    this.checkKey = this.checkKey.bind(this);
    this.renderCategoryMenu = this.renderCategoryMenu.bind(this);
    this.enterSearchQuery = this.enterSearchQuery.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    const category = getCategory(nextProps.props.location);
    const currentQuery = this.props.props.currentQuery;
    const nextQuery = merge({}, currentQuery, {category: category});
  }

  public componentWillMount() {
    let label = window.location.hash.slice(2);
    if (label === "lostandfound") {
      label = "Lost & Found";
    } else if (label == "coursematerial") {
      label = "Course Material";
    } else if (label === "") {
      label = "All";
    }
    if (!(label as any).includes("/")) {
      label = label.charAt(0).toUpperCase() + label.slice(1);

      const currentQuery = this.props.props.currentQuery;
      const nextQuery = merge({}, currentQuery, {category: label});
    }
  }

  private checkKey(e: any) {
    if (e.keyCode === 13) {
      this.enterSearchQuery();
    }
  }

  private onChange(e: any) {
    let query = e.target.value;
    const currentQuery = this.props.props.currentQuery;
    const nextQuery = merge({}, currentQuery, {query});
    this.props.props.saveQuery(nextQuery)
    if (query === "") this.props.search(nextQuery);
  }

  private enterSearchQuery() {
    const currentQuery = this.props.props.currentQuery;
    const nextQuery = merge({}, currentQuery, {page_idx: 1});
    this.props.props.saveQuery(nextQuery);
    this.props.search(nextQuery);
  }

  private renderCategoryMenu(label) {
    const currentQuery = this.props.props.currentQuery;
    const nextQuery = merge({}, currentQuery, {category: label, page_idx: 1});
    this.props.props.saveQuery(nextQuery);
    this.props.search(nextQuery);
    $('#search-query').focus();
  }

  public render() {
    return (
      <div className="container" id="search-navbar-container">
        <div className="dropdown col-md-2" id="no-padding-left">
          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {this.props.props.currentQuery.category}
            <span className="caret" id="special-caret"></span>
          </button>
          <ul className="dropdown-menu col-md-2" aria-labelledby="dropdownMenu1">
            <li><a href="#/recent" onClick={() => this.renderCategoryMenu("All")}>All</a></li>
            <li><a href="#/coursematerial" onClick={() => this.renderCategoryMenu("Course Material")}>Course Material</a></li>
            <li><a href="#/furniture" onClick={() => this.renderCategoryMenu("Furniture")}>Furniture</a></li>
            <li><a href="#/clothing" onClick={() => this.renderCategoryMenu("Clothing")}>Clothing</a></li>
            <li><a href="#/electronics" onClick={() => this.renderCategoryMenu("Electronics")}>Electronics</a></li>
            <li><a href="#/housing" onClick={() => this.renderCategoryMenu("Housing")}>Housing</a></li>
            <li><a href="#/bikes" onClick={() => this.renderCategoryMenu("Bikes")}>Bikes</a></li>
            <li><a href="#/games" onClick={() => this.renderCategoryMenu("Games")}>Games</a></li>
            <li><a href="#/others" onClick={() => this.renderCategoryMenu("Others")}>Others</a></li>
            <li><a href="#/lostandfound" onClick={() => this.renderCategoryMenu("Lost & Found")}>Lost & Found</a></li>
          </ul>
        </div>
        <div className="input-group col-md-10 col-sm-9 col-xs-8" id="phone-search-nav">
          <input id="search-query" type="text" className="form-control" placeholder="Search" onChange={e => this.onChange(e)}
                onKeyDown={e => this.checkKey(e)} value={this.props.props.currentQuery.query} />
          <span className="input-group-addon search-icon" id="basic-addon2" onClick={this.enterSearchQuery}><span className="glyphicon glyphicon-search" aria-hidden="true" /></span>
        </div>
      </div>
    );
  }
}

export { SearchNavbar };
