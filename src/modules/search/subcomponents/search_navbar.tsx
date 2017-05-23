import React from 'react';

interface Props {
  search(query: string) : void;
  props: object;
}

interface State {
  label: string;
}

class SearchNavbar extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      label: "Recent"
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderCateogryMenu = this.renderCateogryMenu.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.props.location.pathname === "/recent") {
      this.setState({label: "Recent"});
    }
  }

  public componentWillMount() {
    let label = window.location.hash.slice(2);
    if (label === "lostandfound") {
      label = "Lost & Found";
    }
    if (!(label as any).includes("/")) {
      label = label.charAt(0).toUpperCase() + label.slice(1);

      this.setState({
        label
      });
    }
  }

  private handleKeyPress(e: any) {
    if (e.key === 'Enter') {
      this.props.search(e.target.value);
    }
  }

  private onChange(e: any) {
    this.props.search(e.target.value);
  }

  private renderCateogryMenu(label) {
    this.setState({ label });
  }

  public render() {
    return (
      <div className="container" id="search-navbar-container">
        <div className="input-group col-md-10 col-sm-9 col-xs-8" id="phone-search-nav">
          <input id="search-input" type="text" className="form-control" placeholder="Search" onChange={this.onChange} />
        </div>
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {this.state.label}
            <span className="caret" id="special-caret"></span>
          </button>
          <ul className="dropdown-menu col-md-2" aria-labelledby="dropdownMenu1">
            <li><a href="#/recent" onClick={() => this.renderCateogryMenu("Recent")}>Recent</a></li>
            <li><a href="#/textbooks" onClick={() => this.renderCateogryMenu("Textbooks")}>Textbooks</a></li>
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
      </div>
    );
  }
}

export { SearchNavbar };
