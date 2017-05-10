import React from 'react';

interface Props {
}

interface State {
}

class SearchSidebar extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-xs-12 col-md-2 menu">
        <dl>
          <dt>Categories</dt>
          <a href=""><dd>Textbooks</dd></a>
          <a href=""><dd>Male Clothing</dd></a>
          <a href=""><dd>Female Clothing</dd></a>
          <a href=""><dd>Furniture</dd></a>
          <a href=""><dd>Electronics</dd></a>
          <a href=""><dd>Kitchenware</dd></a>
          <a href=""><dd>Games</dd></a>
        </dl>
        <div className="input-group">
          <label htmlFor="search-input">Search</label>
          <input id="search-input" type="text" className="form-control" placeholder="Course Name" />
        </div>
        <br/>
      </div>
    );
  }
}

export { SearchSidebar };