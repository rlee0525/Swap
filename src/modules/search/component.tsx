import React from 'react';
import { SearchGridView,
         SearchListView,
         SearchNavbar } from './subcomponents';

interface Post {
  title: string;
  description: string;
  price: number;
  created_at: string;
  condition: string;
  img_url1: string;
  img_url2: string;
  img_url3: string;
}

interface Props {
  searchResult: Post [];
  user: object;
  search(path: string) : void;
  location: {
    pathname: string
  };
}

interface State {
  viewType: string
}

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      viewType: 'grid'
    };
  }

  public componentDidMount() {
    const path = this.props.location.pathname.slice(1);
    if (path === "all") {
      this.props.getPosts();
    } else {
      this.props.search(path);
    }
  }

  public componentWillReceiveProps(nextProps: Props){
    const nextLocation = nextProps.location.pathname.slice(1)
    if (nextLocation !== this.props.location.pathname.slice(1)) {
      if (nextLocation === "all") {
        this.props.getPosts();
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
