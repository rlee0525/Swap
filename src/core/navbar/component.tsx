import React from 'react';

class NavBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      userFB: null,
      accessToken: null,
      status
    };

    this.sendEmail = this.sendEmail.bind(this);
    this.chooseModal = this.chooseModal.bind(this);

    let that = this;
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '641565912703327',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
      });

      FB.Event.subscribe('auth.logout', that.logout)
      FB.Event.subscribe('auth.login', that.login)
      FB.Event.subscribe('auth.statusChange ', that.checkFbStatus)
      that.checkFbStatus();
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  public sendEmail(e) {
    e.preventDefault();
    let accessToken;
    const edu_email = $('input.form-control')[0].value
    let that = this;
    FB.getLoginStatus(function(response) {
      accessToken = response.authResponse.accessToken
      $.ajax({
        method: "PATCH",
        url: `http://localhost:3000/api/users/${accessToken}`,
        data: { edu_email }
      }).then(obj => {
        $('#logInModal').modal('hide');
        $('#emailInputModal').modal('hide');
        $('#emailVerificationModal').modal('show');
      })
    })
  }

  public checkFbStatus() {
    let that = this;
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        FB.api('/me?fields=email,name', function(response) {
          that.setState({ userFB: response });
        });
      } else {
        that.setState({ userFB: null, status });
      }
    });
  }

  public logout(response) {
    this.setState({ userFB: null, accessToken: null, status });
    window.location.replace("/");
  }

  public login(response) {
    let that = this;
    const accessToken = response.authResponse.accessToken;

    this.setState({ accessToken });
    FB.api('/me?fields=email,name', response => {
      this.setState({ userFB: response });
    });

    $.ajax({
      method: "POST",
      url: 'http://localhost:3000/api/users/',
      data: { accessToken }
    }).then(obj => {
      if (obj.edu_email === null) {
        $('#logInModal').modal('hide')
        $('#emailInputModal').modal('show')
      } else if (obj.edu_email_confirmed === false) {
        $('#logInModal').modal('hide')
        $('#emailInputModal').modal('hide')
        $('#emailVerificationModal').modal('show')
      } else {
        $('#logInModal').modal('hide')
      }
    })
  }

  public resendVerificationEmail() {
    $('#logInModal').modal('hide')
    $('#emailInputModal').modal('show')
    $('#emailVerificationModal').modal('hide')
  }

  public chooseModal() {
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        const accessToken = response.authResponse.accessToken
        $.ajax({
          method: "GET",
          url: `http://localhost:3000/api/users/${accessToken}`
        }).then(obj => {
          if (obj.edu_email_confirmed) {
            $('#logInModal').modal('show');
          } else if (obj.edu_email === null) {
            $('#emailInputModal').modal('show');
          } else {
            $('#emailVerificationModal').modal('show');
          }
        }).fail(() => FB.logout())
      } else {
        $('#logInModal').modal('show');
      }
    }
  }

  public checkUserStatus() {
    if (this.state.userFB) {
      return (
        <div className="navbar-collapse collapse" id="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li >
              <a href="#">Browse</a>
            </li>
            <li >
              <a href="#">Who are we?</a>
            </li>
            <li >
              <a onClick={ this.chooseModal }>{this.state.userFB.name}</a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="navbar-collapse collapse" id="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li >
              <a href="#">Browse</a>
            </li>
            <li >
              <a href="#">Who are we?</a>
            </li>
            <li >
              <a onClick={ this.chooseModal }>Sign Up</a>
            </li>
            <li >
              <a onClick={ this.chooseModal }>Log In</a>
            </li>
          </ul>
        </div>
      );
    }
  }

  public render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top navbar-padded text-uppercase app-navbar">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed p-x-0" data-toggle="collapse" data-target="#navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="../">
                <span>Swap</span>
              </a>
            </div>
            {this.checkUserStatus()}
          </div>
        </nav>

        <a id="logInModalTrigger" className="hidden" data-toggle="modal" data-target="#logInModal">Login Modal Trigger</a>
        <div className="modal fade" id="logInModal" tabIndex="-1" role="dialog"
             aria-labelledby="authModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <h3 className="modal-title" id="authModalLabel">Log in with Facebook</h3>
              </div>
              <div className="modal-body text-center" id="fb-modal-body">
                <div className="fb-login-button" data-scope="email" data-max-rows="1" data-size="large" data-button-type="login_with" data-auto-logout-link="true" data-use-continue-as="true" data-onlogin=""></div>

                <div className="modal-body text-center">
                  By signing up, I agree to Swap's <a id="legal-links">Terms of Service</a>, <a id="legal-links">Nondiscrimination Policy</a>, <a id="legal-links">Payments Terms of Service</a>, and <a id="legal-links">Privacy Policy</a>.
                </div>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>

        <a id="emailInputModalTrigger" className="hidden" data-toggle="modal" data-target="#emailInputModal">Email Input Modal Trigger</a>
        <div className="modal fade" id="emailInputModal" tabIndex="-1" role="dialog"
             aria-labelledby="authModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <h3 className="modal-title" id="authModalLabel">Enter your university email address</h3>
              </div>
              <div className="modal-body text-center" id="fb-modal-body">
                <form onSubmit={ this.sendEmail }>
                  <div className="form-group input-group">
                    <input type="text" className="form-control" placeholder="Your email" aria-describedby="basic-addon2"/>
                    <span className="input-group-addon" id="basic-addon2">@berkeley.edu</span>
                  </div>
                  <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ this.sendEmail }>Submit</button>
                </form>
              </div>
              <br/>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>

        <a id="emailVerificationModalTrigger" className="hidden" data-toggle="modal" data-target="#emailVerificationModal">Email Verification Modal Trigger</a>
        <div className="modal fade" id="emailVerificationModal" tabIndex="-1" role="dialog"
             aria-labelledby="authModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <h3 className="modal-title" id="authModalLabel">Thank you!</h3>
              </div>
              <div className="modal-body text-center" id="fb-modal-body">
                <h4>
                  Please check your email for the verification link
                </h4>
                <br/>
                <button type="button" className="btn btn-warning btn-lg btn-block" onClick={ this.resendVerificationEmail }>Re-send verification email</button>
                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ () => $('#emailVerificationModal').modal('hide') }>Close</button>
              </div>
              <br/>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default NavBar;
