import React from 'react';
import { IPost } from 'common/interfaces';
import { shortenString, 
         capitalize,
         searchParams } from 'helpers';

import { SearchGridView,
         SearchListView,
         SearchNavbar } from './subcomponents';

interface State {
  viewType: string;
  posts: object;
}

interface Props {
  user: object;
  searchResult: IPost[];
  search: (query: object) => JQueryXHR;
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
    let category = this.props.location.pathname.slice(1);

    if (category === "recent") {
      this.props.search(searchParams("", "All")).then(res => {
        let posts = this.props.searchResult;
        this.setState({
          posts: this.props.searchResult
        });
      })
    } else {
      if (category === "lostandfound") {
        category = "Lost & Found";
      } else if (category === "coursematerial") {
        category = "Course Material";
      } else {
        category = capitalize(category);
      }
      
      this.props.search(searchParams("", category)).then(res => {
        let posts = this.props.searchResult;
        this.setState({
          posts: this.props.searchResult
        });
      })
    }
  }

  public componentWillReceiveProps(nextProps: any){
    let nextCategory = nextProps.location.pathname.slice(1);

    if (nextCategory !== this.props.location.pathname.slice(1)) {
      if (nextCategory === "recent") {
        this.props.search(searchParams("", "All")).then(res => {
          let posts = this.props.searchResult;
          this.setState({
            posts: this.props.searchResult
          });
        })
      } else {
        if (nextCategory === "lostandfound") {
          nextCategory = "Lost & Found";
        } else if (nextCategory === "coursematerial") {
          nextCategory = "Course Material";
        } else {
          nextCategory = capitalize(nextCategory);
        }

        this.props.search(searchParams("", nextCategory)).then(res => {
          let posts = this.props.searchResult;
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
    let uppercase;

    if (path === "lostandfound") {
      uppercase = "Lost & Found";
    } else if (path === "coursematerial") {
      uppercase = "Course Material";
    } else {
      uppercase = path[0].toUpperCase() + path.slice(1, path.length);
    }
    
    return (
      <div>
        <div className="container">
          <div className="row">
            <SearchNavbar props={this.props} search={this.props.search} />

            <div className="col-md-12">
              <div id="nav-tools">
                <nav className="breadcrumb" id="breadcrumb-container">
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
