import React from 'react';

interface Props {
  search(query: string) : void;
}

interface State {
}

class SearchSidebar extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  private handleKeyPress(e: any) {
    if (e.key === 'Enter') {
      this.props.search(e.target.value);
    }
  }

  private onChange(e: any) {
    this.props.search(e.target.value);
  }

  public render() {
    return (
      <div className="col-xs-12 col-md-2 menu">
        <dl>
          <dt>Categories</dt>
          <a href="#/all"><dd>What's New</dd></a>
          <a href="#/textbooks"><dd>Textbooks</dd></a>
          <a href="#/clothing"><dd>Clothing</dd></a>
          <a href="#/furniture"><dd>Furniture</dd></a>
          <a href="#/electronics"><dd>Electronics</dd></a>
          <a href="#/kitchenware"><dd>Kitchenware</dd></a>
          <a href="#/games"><dd>Games</dd></a>
        </dl>
        <div className="input-group">
          <label htmlFor="search-input">Search</label>
          <input id="search-input" type="text" className="form-control" placeholder="Course Name" onChange={this.onChange} />
        </div>
        <br/>
      </div>
    );
  }
}

export { SearchSidebar };
