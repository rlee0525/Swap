import React from 'react';
import { IPost } from 'common/interfaces';
import { shortenString,
         capitalize,
         searchParams,
         getCategory } from 'helpers';

import { SearchGridView,
         SearchListView,
         SearchNavbar } from './subcomponents';

import { merge } from 'lodash';

interface State {
  viewType: string;
}

interface Props {
  user: object;
  searchResult: any;
  search: (query: object) => JQueryXHR;
  location: any;
  post: any;
  currentQuery: any;
  saveQuery: any;
}

class Search extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      viewType: 'grid'
    };
    this.renderCategoryMenu = this.renderCategoryMenu.bind(this);
  }

  public componentWillMount() {
    let category = getCategory(this.props.location);
    const currentQuery = this.props.currentQuery;
    const nextQuery = merge({}, currentQuery, {category, page_idx: 1});
    this.props.saveQuery(nextQuery);
    this.props.search(nextQuery);
  }

  public componentWillReceiveProps(nextProps: any){
    if (this.props.currentQuery.category != nextProps.currentQuery.category) {
      this.props.saveQuery(nextProps.currentQuery);
      this.props.search(nextProps.currentQuery);
    } else if (this.props.location != nextProps.location) {
      let category = getCategory(nextProps.location);
      const currentQuery = this.props.currentQuery;
      const nextQuery = merge({}, currentQuery, {category, page_idx: 1});
      this.props.saveQuery(nextQuery);
      this.props.search(nextQuery);
    }
  }

  private changeView(viewType: string) {
    return () => this.setState({ viewType })
  }

  private renderView() {
    if (this.state.viewType === 'grid') {
      return <SearchGridView props={this.props}
        searchResult={this.props.searchResult}
        search={this.props.search} location={this.props.location} />;
    } else {
      return <SearchListView props={this.props}
        searchResult={this.props.searchResult}
        search={this.props.search} location={this.props.location} />;
    }
  }

  private renderCategoryMenu(label) {
    const currentQuery = this.props.currentQuery;
    const nextQuery = merge({}, currentQuery, {category: label});
    this.props.saveQuery(nextQuery);
    $('#search-query').focus();
  }

  public render() {
    let path = this.props.location.pathname.slice(1);
    let category = getCategory(this.props.location);
    if (category === "All") category = '';
    return (
      <div>
        <div className="container">
          <div className="row">
            <SearchNavbar props={this.props} search={this.props.search} />

            <div className="col-md-12">
              <div id="nav-tools">
                <nav className="breadcrumb" id="breadcrumb-container">
                  <a onClick={() => this.renderCategoryMenu("All")} className="breadcrumb-item" href="#/recent">All</a>
                  <a onClick={() => this.renderCategoryMenu(category)} className="breadcrumb-item" href={`#/${path}`}>{category}</a>
                </nav>
                <span>You have {this.props.searchResult.result_count} result(s)</span>
                <div className="search-icons">
                  <button className="btn btn-link btn-special-size btn-special-margin" id="grid-type" onClick={this.changeView('grid')}>
                    <span className="glyphicon glyphicon-th-large"></span>
                  </button>
                  <button className="btn btn-link btn-special-size btn-special-margin" id="list-type" onClick={this.changeView('list')}>
                    <span className="glyphicon glyphicon-th-list"></span>
                  </button>
                </div>
              </div>
              { this.renderView() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
