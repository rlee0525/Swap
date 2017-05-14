import React from 'react';

interface Props {
  search(query: string) : void;
}

interface State {
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

    console.log(this.props);
    return (
      <div className="container" id="search-navbar-container">
        <div className="input-group col-md-10 col-sm-9 col-xs-9">
          <input id="search-input" type="text" className="form-control" placeholder="Search" onChange={this.onChange} />
        </div>
        <div className="dropdown col-md-2 col-sm-3 col-xs-3">
          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {this.state.label}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu col-md-2" aria-labelledby="dropdownMenu1">
            <li><a href="#/all" onClick={() => this.renderCateogryMenu("Recent")}>What's New</a></li>
            <li><a href="#/textbooks" onClick={() => this.renderCateogryMenu("Textbooks")}>Textbooks</a></li>
            <li><a href="#/clothing" onClick={() => this.renderCateogryMenu("Clothing")}>Clothing</a></li>
            <li><a href="#/furniture" onClick={() => this.renderCateogryMenu("Furniture")}>Furniture</a></li>
            <li><a href="#/electronics" onClick={() => this.renderCateogryMenu("Electronics")}>Electronics</a></li>
            <li><a href="#/kitchenware" onClick={() => this.renderCateogryMenu("Kitchenware")}>Kitchenware</a></li>
            <li><a href="#/games" onClick={() => this.renderCateogryMenu("Games")}>Games</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export { SearchNavbar };
