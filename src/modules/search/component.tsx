import React from 'react';
import { IPost } from 'common/interfaces';
import { shortenString } from 'helpers';

import {
  SearchGridView,
  SearchListView,
  SearchNavbar } from './subcomponents';

interface State {
  viewType: string;
  posts: object;
}

interface Props {
  user: object;
  searchResult: IPost[];
  search: (query: string) => JQueryXHR;
  location: any;
  post: any;
}

class Search extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      viewType: 'grid',
      posts: null
    };
  }

  public componentWillMount() {
    let path = this.props.location.pathname.slice(1);
    if (path === "recent") {
      this.props.search('').then(res => {
        let posts = this.props.searchResult.sort((a: any, b: any) => Date.parse(b.created_at) - Date.parse(a.created_at))
        this.setState({
          posts: this.props.searchResult
        });
      })
    } else {
      if (path === "lostandfound") {
        path = "Lost & Found";
      }
      this.props.search(path).then(res => {
        let posts = this.props.searchResult.sort((a: any, b: any) => Date.parse(b.created_at) - Date.parse(a.created_at))
        this.setState({
          posts: this.props.searchResult
        });
      })
    }
  }

  public componentWillReceiveProps(nextProps: any){
    let nextLocation = nextProps.location.pathname.slice(1)
    if (nextLocation !== this.props.location.pathname.slice(1)) {
      if (nextLocation === "recent") {
        this.props.search('').then(res => {
          let posts = this.props.searchResult.sort((a: any, b: any) => Date.parse(b.created_at) - Date.parse(a.created_at))
          this.setState({
            posts: this.props.searchResult
          });
        })
      } else {
        if (nextLocation === "lostandfound") {
          nextLocation = "Lost & Found";
        }
        this.props.search(nextLocation).then(res => {
          let posts = this.props.searchResult.sort((a: any, b: any) => Date.parse(b.created_at) - Date.parse(a.created_at))
          this.setState({
            posts: this.props.searchResult
          });
        })
      }
    }
  }

  private changeView(viewType: string) {
    return () => this.setState({ viewType })
  }

  private renderView() {
    if (this.state.viewType === 'grid') {
      return <SearchGridView searchResult={this.props.searchResult} />;
    } else {
      return <SearchListView searchResult={this.props.searchResult} />;
    }
  }

  public render() {
    let path = this.props.location.pathname.slice(1);
    if (path == "lostandfound") {
      path = "Lost & Found";
    }
    const uppercase = path[0].toUpperCase() + path.slice(1, path.length);
    return (
      <div>
        <div className="container">
          <div className="row">
            <SearchNavbar props={this.props} search={this.props.search} />

            <div className="col-md-12">
              <div id="nav-tools">
                <nav className="breadcrumb">
                  <a className="breadcrumb-item" href="#/recent">All</a>
                  <a className="breadcrumb-item" href={`#/${path}`}>{uppercase}</a>
                </nav>
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
