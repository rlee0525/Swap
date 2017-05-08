import React from 'react';
import { withRouter, Link } from 'react-router';
import { DropdownMenu } from './subcomponents';
// import { authenticateUser } from 'modules/user/utils';
// import { toggleSidebar } from 'helpers';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };
  }

  toggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  renderRightMenu() {
    if(this.props.loggedIn) {
      return (
        <div className='navbar-right-menu'>
          <a onClick={this.toggleDropdown.bind(this)} style={{cursor: 'pointer'}}>
            <img className='navbar-user-picture' src={this.props.user.picture} />
          </a>
          { this.state.showDropdown ? <DropdownMenu
            context={this}
            toggleDropdown={this.toggleDropdown.bind(this)}
            user={this.props.user}
            logout={this.props.logout}/> : null }
        </div>
      );
    } else {
      return (
        <div className='navbar-right-menu'>

          <a onClick={this.props.loginUser} style={{cursor: 'pointer'}}>
            <p className="sign-in-text">SIGN IN</p>
          </a>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='navbar'>
        <div className='navbar-left-menu'>
          <Link to='/' className='youtube-logo' id="sidebar-logo">
            <img src="./app/assets/Youtube-logo.png"/>
          </Link>
        </div>

        <div className='navbar-center-menu'>
        </div>

        { this.renderRightMenu() }

      </div>
    );
  }
}

export default withRouter(Navbar);
