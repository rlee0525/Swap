import React from 'react';
import autoBind from 'react-autobind';
import { withRouter } from 'react-router';
import { LargeButton } from 'common/components';

declare var $;
declare var FB;
declare var window;

class NavBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      modalHeader: "Log in with Facebook"
    };

    autoBind(this);
  }

  public componentDidMount() {
    this.initializeNavbarFade();
    this.reinitializeFB();
  }

  // necessary for getting the FB button to load
  public reinitializeFB() {
    FB.init({
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
  }

  public initializeNavbarFade() {
    $(window).scroll(function(){
      if ($(this).scrollTop() > 300) {
        $('#menu').fadeIn(500);
      } else {
        $('#menu').fadeOut(500);
      }
    });
  }

  private isEmailAddress(str) {
    let pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);
  }

  public sendEmail(e: any) {
    e.preventDefault();

    let accessToken;
    let that = this;
    const edu_email = ($('input.form-control')[0] as HTMLInputElement).value

    if (this.isEmailAddress(edu_email)) {
      $('#email-input-form').removeClass("has-error");
      $.ajax({
        method: "PATCH",
        url: `api/users/${that.props.user.auth.accessToken}`,
        data: { edu_email }
      }).then(obj => {
        $('#logInModal').modal('hide');
        $('#emailInputModal').modal('hide');
        $('#emailVerificationModal').modal('show');
      })
    } else {
      $('#email-error-div').addClass("has-error");
      setTimeout(() => $('#email-error-div').removeClass("has-error"), 1500);
    }
  }

  public resendVerificationEmail() {
    $('#logInModal').modal('hide')
    $('#emailInputModal').modal('show')
    $('#emailVerificationModal').modal('hide')
  }

  public chooseModal() {
    const that = this;

    if (that.props.user !== null) {
      that.setState({modalHeader: "Log out with Facebook"});
      const accessToken = that.props.user.auth.accessToken;
      $.ajax({
        method: "GET",
        url: `api/users/${accessToken}`
      }).then(obj => {
        if (obj.edu_email_confirmed) {
          $('#logInModal').modal('show');
        } else if (obj.edu_email === null) {
          $('#emailInputModal').modal('show');
        } else {
          $('#emailVerificationModal').modal('show');
        }
      }).fail(() => FB.logout(res => console.log(res)))
    } else {
      that.setState({modalHeader: "Log in with Facebook"})
      $('#logInModal').modal('show');
    }
  }

  public checkVerified(e: any) {
    if (this.props.user === null) {
      FB.logout();
      window.location.replace("/");
      return null;
    };

    let address = e.currentTarget.id + "?posts";
    if (e.currentTarget.id === "messages") address = "messages";
    const accessToken = this.props.user.auth.accessToken;

    $.ajax({
      method: "GET",
      url: `api/users/${accessToken}`
    }).then(obj => {
      if (obj.edu_email_confirmed) {
        this.props.router.push(address);
      } else if (obj.edu_email === null) {
        $('#emailInputModal').modal('show');
      } else {
        $('#emailVerificationModal').modal('show');
      }
    }).fail(() => FB.logout(res => console.log(res)))
  }

  public loginStatus() {
    $('#emailVerificationModal').modal('hide');
    $('#emailInputModal').modal('hide');
    $('#logInModal').modal('show');
  }

  public checkUserStatus(id) {
    if (this.props.user !== null) {
      return (
        <div className="navbar-collapse collapse" id={id}>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/#/recent">Browse</a></li>
            <li><a id="dashboard" onClick={(e) => this.checkVerified(e)}>Dashboard</a></li>
            <li>
              <a id="messages" onClick={(e) => this.checkVerified(e)}>
                Messages
                {this.props.unreadMessage && 
                  <div className='noti unread' id='unread-noti' />}
              </a>
            </li>
            <li><a onClick={this.chooseModal}>{this.props.user.userFB.name}</a></li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="navbar-collapse collapse" id={id}>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/#/recent">Browse</a></li>
            <li><a onClick={this.chooseModal}>Sign Up</a></li>
            <li><a onClick={this.chooseModal}>Log In</a></li>
          </ul>
        </div>
      );
    }
  }

  public render() {
    console.log(this.props.unreadMessage);
    $('.navbar-collapse a').click(function(){
      $(".navbar-collapse").collapse('hide');
    });

    return (
      <div>
        <nav 
          id="menu" 
          className="navbar navbar-default navbar-static-top navbar-padded text-uppercase app-navbar"
        >
          <div className="container">
            <div className="navbar-header">
              <button 
                type="button" 
                className="navbar-toggle collapsed p-x-0" 
                data-toggle="collapse" 
                data-target="#navbar-collapse"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="#">
                <span>Swap</span>
              </a>
            </div>
            {this.checkUserStatus("navbar-collapse")}
          </div>
        </nav>
        <nav className="navbar navbar-default navbar-static-top navbar-padded text-uppercase app-navbar">
          <div className="container">
            <div className="navbar-header">
              <button 
                type="button" 
                className="navbar-toggle collapsed p-x-0" 
                data-toggle="collapse" 
                data-target="#navbar-collapse2"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="#">
                <span>Swap</span>
              </a>
            </div>
            {this.checkUserStatus("navbar-collapse2")}
          </div>
        </nav>

        <a id="logInModalTrigger" className="hidden" data-toggle="modal" data-target="#logInModal">
          Login Modal Trigger
        </a>
        <div className="modal fade" id="logInModal" tabIndex={-1} role="dialog"
             aria-labelledby="authModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h3 className="modal-title" id="authModalLabel">{this.state.modalHeader}</h3>
              </div>
              <div className="modal-body text-center" id="fb-modal-body">
                <div 
                  className="fb-login-button" 
                  data-scope="email" 
                  data-max-rows="1" 
                  data-size="large" 
                  data-button-type="login_with" 
                  data-auto-logout-link="true" 
                  data-use-continue-as="true" 
                  data-onlogin="" />
                <div className="modal-body text-center">
                  By signing up, I agree to Swap's 
                  &nbsp;<a href="/#/infos?faq" target="_blank">Terms of Service</a>, 
                  &nbsp;<a href="/#/infos?faq" target="_blank">Nondiscrimination Policy</a>, 
                  &nbsp;<a href="/#/infos?faq" target="_blank">Payments Terms of Service</a>, 
                  &nbsp;and <a href="/#/infos?faq" target="_blank">Privacy Policy</a>.
                </div>
              </div>
              <div className="modal-footer" />
            </div>
          </div>
        </div>

        <a id="emailInputModalTrigger" className="hidden" data-toggle="modal" data-target="#emailInputModal">
          Email Input Modal Trigger
        </a>
        <div 
          className="modal fade" 
          id="emailInputModal" 
          tabIndex={-1} 
          role="dialog"
          aria-labelledby="authModalLabel" 
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h3 className="modal-title" id="authModalLabel">Enter your email address</h3>
              </div>
              <div className="modal-body text-center" id="fb-modal-body">
                <form onSubmit={ this.sendEmail }>
                  <div className="form-group input-group" id="email-error-div">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Your email" 
                      aria-describedby="basic-addon2"
                    />
                    <span className="input-group-addon" id="basic-addon2">ex) swap@berkeley.edu</span>
                  </div>
                  <LargeButton 
                    type="Submit"
                    class="btn-primary" 
                    click={ this.sendEmail }
                  />
                  <LargeButton 
                    type="Logout" 
                    class="btn-secondary" 
                    click={ this.loginStatus }
                  />
                </form>
              </div>
              <br/>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>

        <a 
          id="emailVerificationModalTrigger" 
          className="hidden" 
          data-toggle="modal" 
          data-target="#emailVerificationModal"
        >
          Email Verification Modal Trigger
        </a>
        <div className="modal fade" id="emailVerificationModal" tabIndex={-1} role="dialog"
             aria-labelledby="authModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h3 className="modal-title" id="authModalLabel">Thank you!</h3>
              </div>
              <div className="modal-body text-center" id="fb-modal-body">
                <h4>Please check your email for the verification link</h4>
                <br/>
                <LargeButton 
                  type="Re-send verification email" 
                  class="btn-warning" 
                  click={ this.resendVerificationEmail }
                />
                <LargeButton 
                  type="Logout" 
                  class="btn-secondary" 
                  click={ this.loginStatus }
                />
              </div>
              <br/>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
