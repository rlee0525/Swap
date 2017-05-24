import React from 'react';
import { searchParams } from 'helpers';

interface Props {
  search(query: object) : void;
  props: object;
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
    this.renderCateogryMenu = this.renderCateogryMenu.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.props.location.pathname === "/recent") {
      this.setState({label: "All"});
    }
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

      this.setState({
        label
      });
    }
  }

  private checkKey(e: any) {
    if (e.keyCode === 13 && this.state.query !== "") {
      let query = e.target.value;
      let category = this.state.label;

      this.props.search(searchParams(query, category));
    }
  }

  private onChange(e: any) {
    this.setState({ query: e.target.value });
  }

  private onClick() {
    let input: any = document.getElementById("search-query");
    let query: string = input.value;
    let category = this.state.label;

    this.props.search(searchParams(query, category));
  }

  private renderCateogryMenu(label) {
    this.setState({ label });
  }

  public render() {
    return (
      <div className="container" id="search-navbar-container">
        <div className="dropdown col-md-2" id="no-padding-left">
          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {this.state.label}
            <span className="caret" id="special-caret"></span>
          </button>
          <ul className="dropdown-menu col-md-2" aria-labelledby="dropdownMenu1">
            <li><a href="#/recent" onClick={() => this.renderCateogryMenu("All")}>All</a></li>
            <li><a href="#/coursematerial" onClick={() => this.renderCateogryMenu("Course Material")}>Course Material</a></li>
            <li><a href="#/furniture" onClick={() => this.renderCateogryMenu("Furniture")}>Furniture</a></li>
            <li><a href="#/clothing" onClick={() => this.renderCateogryMenu("Clothing")}>Clothing</a></li>
            <li><a href="#/electronics" onClick={() => this.renderCateogryMenu("Electronics")}>Electronics</a></li>
            <li><a href="#/housing" onClick={() => this.renderCateogryMenu("Housing")}>Housing</a></li>
            <li><a href="#/bikes" onClick={() => this.renderCateogryMenu("Bikes")}>Bikes</a></li>
            <li><a href="#/games" onClick={() => this.renderCateogryMenu("Games")}>Games</a></li>
            <li><a href="#/others" onClick={() => this.renderCateogryMenu("Others")}>Others</a></li>
            <li><a href="#/lostandfound" onClick={() => this.renderCateogryMenu("Lost & Found")}>Lost & Found</a></li>
          </ul>
        </div>
        <div className="input-group col-md-10 col-sm-9 col-xs-8" id="phone-search-nav">
          <input id="search-query" type="text" className="form-control" placeholder="Search" onChange={e => this.onChange(e)} onKeyDown={e => this.checkKey(e)}
                onKeyUp={e => this.checkKey(e)}/>
          <span className="input-group-addon search-icon" id="basic-addon2" onClick={this.onClick}><span className="glyphicon glyphicon-search" aria-hidden="true" /></span>
        </div>
      </div>
    );
  }
}

export { SearchNavbar };
