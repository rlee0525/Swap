import React from 'react';
import { Link } from 'react-router';

interface Header {
  title: string;
  link: string;
}

interface Props {
  headers: Header[];
  active: string;
  button: null | { title: string; action: any }
}

interface State {
  headerTitle: string;
}

class DashboardHeaders extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      headerTitle: "Posts"
    };

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(headerTitle) {
    this.setState({ headerTitle });
  }

  renderHeaders() {
    let { active, headers } = this.props;
    let windowSize = window.innerWidth > 450;

    return (
      headers.map(header => (
        <li 
          role="presentation" 
          id="dashboard-nav-title" 
          className={header.link === active ? 'active' : ''}
        >
          <Link 
            to={`dashboard?${header.link}`}
            onClick={() => this.changeTab(header.title)}
          >
            { header.title }
          </Link>
        </li>
      ))
    );
  }

  renderButtons() {
    let button = this.props.button;
    let windowSize = window.innerWidth > 450;

    if (button) {
      return (
        <div className={windowSize ? "" : "col-xs-2"}>
          <button 
            onClick={button.action} 
            className="btn btn-clear nav-button" 
            id="responsive-create-text"
          >
            { button.title }
          </button>
          <button 
            onClick={button.action} 
            className="btn btn-clear nav-button" 
            id="responsive-create-icon"
          >
            <span 
              className="glyphicon glyphicon-edit" 
              aria-hidden="true" 
              id="create-icon-button"
            />
          </button>
        </div>
      )
    }

    return null;
  }

  render() {
    let { active, headers, button } = this.props;
    let windowSize = window.innerWidth > 450;

    if (windowSize) {
      return (
        <ul className="nav nav-tabs">
          {this.renderHeaders()}
          {this.renderButtons()}
        </ul>
      );
    } else {
      return (
        <div className="row">
          <div className="col-xs-9">
            <div className="dropdown dashboard-dropdown">
              <button 
                type="button" 
                id="dropdownMenu2" 
                aria-haspopup="true" 
                aria-expanded="true"
                data-toggle="dropdown" 
                className="btn btn-default dropdown-toggle" 
              >
                {this.state.headerTitle}
                <span className="caret" id="special-caret" />
              </button>
              <ul 
                className="dropdown-menu category-dropdown" 
                aria-labelledby="dropdownMenu2"
              >
                {this.renderHeaders()}
              </ul>
            </div>
          </div>

          {this.renderButtons()}
        </div>
      );
    }
  }
}

export { DashboardHeaders };