import React from 'react';

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1843174039341965',
        cookie: true,
        xfbml: true,
        version: 'v2.1'
      });

      FB.getLoginStatus(function(response) {
        console.log(response);
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    ((d, s, id) => {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.setAttribute('src', "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1843174039341965");
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  public testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    });
  }

  public statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
    }
  }

  public checkLoginState() {
    FB.getLoginStatus(function(response) {
      console.log(response)
      this.statusChangeCallback(response);
    }.bind(this));
  }

  public handleClick() {
    FB.login(this.checkLoginState());
  }

  public render() {
    console.log(this.props);

    return (
      <div>
        Hi
        <a href="#" onClick={this.handleClick}>Login</a>
        <div id="status"></div>
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="continue_with"
          data-show-faces="true"
          data-auto-logout-link="true"
          data-use-continue-as="true"
        />
      </div>
    );
  }
}

export default Home;
