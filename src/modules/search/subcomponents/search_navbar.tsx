import React from 'react';

interface Props {}

interface State {}

class SearchNavbar extends React.Component<Props,State> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top navbar-padded text-uppercase app-navbar">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed p-x-0"
              data-toggle="collapse"
              data-target="#navbar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="../">
              <span>Swap</span>
            </a>
          </div>
          <div className="navbar-collapse collapse" id="navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li >
                <a href="#">Search</a>
              </li>
              <li className="active">
                <a href="#">Who are we?</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export { SearchNavbar };