import React from 'react';
import { merge } from 'lodash';
import { IPost } from 'common/interfaces';

import { shortenString,
         capitalize,
         searchParams,
         getCategory } from 'helpers';

import { SearchGridView,
         SearchListView,
         SearchNavbar,
         Pagination } from './subcomponents';

interface State {
  categories: any;
}

interface Props {
  user: any;
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
      categories: [
        "All", "Course Material", "Furniture", "Clothing",
        "Electronics", "Housing", "Bikes", "Games", "Others",
        "Lost & Found", "My Course Material"
      ]
    }
    this.renderCategoryMenu = this.renderCategoryMenu.bind(this);
  }

  public componentWillMount() {
    const category = getCategory(this.props.location);

    if (this.state.categories.includes(category)) {
      this.props.saveQuery({category});
    }
  }

  public componentWillReceiveProps(nextProps: any){
    const category = getCategory(nextProps.location);

    if (this.state.categories.includes(category) &&
        nextProps.location !== this.props.location) {
      const currentQuery = this.props.currentQuery;
      this.props.saveQuery({category});

      let nextQuery = merge({}, currentQuery, {category})
      if (this.props.currentQuery.category === "My Course Material" && this.props.user) {
        const access_token = this.props.user.auth.accessToken;
        nextQuery = merge({}, nextQuery, {access_token});
        this.props.search(nextQuery);
      } else {
        this.props.search(nextQuery);
      }
    }
  }

  private changeView(viewType: string) {
    const currentQuery = this.props.currentQuery;
    this.props.saveQuery({viewType});

    let nextQuery = merge({}, currentQuery, {viewType})
    if (this.props.currentQuery.category === "My Course Material" && this.props.user) {
      const access_token = this.props.user.auth.accessToken;
      nextQuery = merge({}, nextQuery, {access_token});
      this.props.search(nextQuery);
    } else {
      this.props.search(nextQuery);
    }
  }

  private renderView() {
    if (this.props.currentQuery.viewType === 'grid') {
      return (
        <SearchGridView
          user={this.props.user}
          searchResult={this.props.searchResult}
          search={this.props.search}
          currentQuery={this.props.currentQuery}
          saveQuery={this.props.saveQuery}
        />
      );
    } else {
      return (
        <SearchListView
          user={this.props.user}
          searchResult={this.props.searchResult}
          search={this.props.search}
          currentQuery={this.props.currentQuery}
          saveQuery={this.props.saveQuery}
        />
      );
    }
  }

  private renderCategoryMenu(label) {
    this.props.saveQuery({category: label});

    $('#search-query').focus();
  }

  public render() {
    let path = this.props.location.pathname.slice(1);
    let category = getCategory(this.props.location);
    let label = category;
    if (category === "All") label = null;
    if (category === "Mycoursematerial") {
      label = 'My Course Material';
      category = 'My Course Material';
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <SearchNavbar
              user={this.props.user}
              searchResult={this.props.searchResult}
              search={this.props.search}
              currentQuery={this.props.currentQuery}
              saveQuery={this.props.saveQuery}
              home={false}
            />

            <div className="col-md-12">
              <div id="nav-tools">
                <nav className="breadcrumb" id="breadcrumb-container">
                  <a onClick={() => this.renderCategoryMenu("All")} className="breadcrumb-item" href="#/recent">All</a>
                  {label && <a onClick={() => this.renderCategoryMenu(category)} className="breadcrumb-item" href={`#/${path}`}>{label}</a>}
                  <span className="breadcrumb-item active">{(this.props.currentQuery.page_idx - 1) * 16 + 1} - {(this.props.currentQuery.page_idx * 16)} results</span>
                </nav>

                <div className="search-icons">
                  <button className="btn btn-link btn-special-size btn-special-margin" id="grid-type" onClick={() => this.changeView('grid')}>
                    <span className="glyphicon glyphicon-th-large"></span>
                  </button>
                  <button className="btn btn-link btn-special-size btn-special-margin" id="list-type" onClick={() => this.changeView('list')}>
                    <span className="glyphicon glyphicon-th-list"></span>
                  </button>
                </div>
              </div>
              { this.renderView() }
              <Pagination
                search={this.props.search}
                saveQuery={this.props.saveQuery}
                maxPages={this.props.searchResult.max_pages}
                currentPage={this.props.currentQuery.page_idx}
                currentQuery={this.props.currentQuery}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
