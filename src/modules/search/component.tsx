import React from 'react';
import { IPost } from 'helpers';

import { 
  SearchGridView,
  SearchListView,
  SearchNavbar } from './subcomponents';

interface State {
  viewType: string;
}

interface Props {
  user: object;
  searchResult: IPost[];
  search: (query: string) => JQueryXHR;
}

class Search extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      viewType: 'grid'
    };
  }

  public componentWillMount() {
    const path = this.props.location.pathname.slice(1);
    if (path === "recent") {
      this.props.search('');
    } else {
      this.props.search(path);
    }
  }

  public componentWillReceiveProps(nextProps: any){
    const nextLocation = nextProps.location.pathname.slice(1)
    if (nextLocation !== this.props.location.pathname.slice(1)) {
      if (nextLocation === "recent") {
        this.props.search('');
      } else {
        this.props.search(nextLocation);
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
    return (
      <div>
        <div className="container">
          <div className="row">
            <SearchNavbar search={this.props.search} />
            <div className="col-md-12">
              <div className="search-icons">
                <button className="btn btn-link" id="grid-type" onClick={this.changeView('grid')}>
                  <span className="glyphicon glyphicon-th-large"></span> Grid View
                </button>
                <button className="btn btn-link" id="list-type" onClick={this.changeView('list')}>
                  <span className="glyphicon glyphicon-th-list"></span> List View
                </button>
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
