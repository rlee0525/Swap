import * as React from 'react';
import NavBar from 'core/navbar';
import Footer from 'core/footer';

interface Props {
  children: any;
}

interface State {
  userFB: number;
  accessToken: string;
  status: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      userFB: null,
      accessToken: null,
      status
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkFbStatus = this.checkFbStatus.bind(this);

    let that = this;
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '1843174039341965',
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
      js = d.createElement(s as any | null);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  public checkFbStatus() {
    let that = this;
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        FB.api('/me?fields=email,name', function(response: any) {
          that.setState({ userFB: response, status: "connected" });
        });
      } else {
        that.setState({ userFB: null, status });
      }
    });
  }

  public logout(response: any) {
    this.setState({ userFB: null, accessToken: null, status });
    (window as any).location.replace("/");
  }

  public login(response: any) {
    let that = this;
    const accessToken = response.authResponse.accessToken;

    this.setState({ accessToken });
    FB.api('/me?fields=email,name', (response: any) => {
      this.setState({ userFB: response });
    });

    $.ajax({
      method: "POST",
      url: '/api/users/',
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

  public render() {
    console.log(this.props)
    return (
      <div className='home'>
        <NavBar
          userFB={this.state.userFB}
          accessToken={this.state.accessToken}
          status={this.state.status} />
        {React.cloneElement(this.props.children, this)}
        <Footer />
      </div>
    )
  }
}


export default App;
