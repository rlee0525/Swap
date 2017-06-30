declare var $, window;

import * as React from 'react';
import * as firebase from 'firebase';

import NavBar from 'core/navbar';
import Footer from 'core/footer';

interface Props {
  children: any;
  receiveUser: any;
  user: any;
  fetchFirebaseConversations: any;
}

interface State {
  userFB: number;
  accessToken: string;
  status: string;
  unreadMessage: boolean;
}

class App extends React.Component<Props, State> {
  ref;
  constructor(props: Props) {
    super(props);

    this.state = {
      userFB: null,
      accessToken: null,
      status: "",
      unreadMessage: false
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkFbStatus = this.checkFbStatus.bind(this);
    this.ref = null;

    FB.Event.subscribe('auth.logout', this.logout);
    FB.Event.subscribe('auth.login', this.login);
    FB.Event.subscribe('auth.statusChange ', this.checkFbStatus);
  }

  public componentDidMount() {
    if (this.props.user) {
      let { user } = this.props;
      this.props.fetchFirebaseConversations(user);
      
      const access_token = user.auth.accessToken;
      
      $.ajax({
        method: 'GET',
        url: `api/users/${access_token}`
      }).then(res => {
        let conversations = res.conversations;
        let ids = [];

        for (var i = 0; i < conversations.length; i++) {
          var element = conversations[i].conversation_id;
          ids.push(element)
        }

        if (ids.length === 0) {
          return;
        } else {
          this.ref = firebase.database().ref(`conversations/${ids[0]}`); 
          
          for (let i = 0; i < ids.length; i++) {
            let data = firebase.database().ref(`conversations/${ids[i]}`).once('value', snapshot => {
              let messages = snapshot.val() || {};              
              let timestamps = Object.keys(messages);

              if (timestamps.length === 0) {
                this.setState({ unreadMessage: false });
                return;
              }

              let lastMessage = messages[timestamps[timestamps.length - 1]];

              if (lastMessage.sender !== user.userFB.id && !lastMessage.seen) {
                this.setState({ unreadMessage: true });
                return;
              }
            });
          }
        }
      });
    }
  }

  public componentWillReceiveProps(newProps) {
    if (newProps.user) {
      let { user } = newProps;
      const access_token = user.auth.accessToken;    
      
      $.ajax({
        method: 'GET',
        url: `api/users/${access_token}`
      }).then(res => {
        let conversations = res.conversations;
        let ids = [];

        for (var i = 0; i < conversations.length; i++) {
          var element = conversations[i].conversation_id;
          ids.push(element)
        }

        if (ids.length === 0) {
          return;
        } else {
          this.ref = firebase.database().ref(`conversations/${ids[0]}`); 
          
          for (let i = 0; i < ids.length; i++) {
            let data = firebase.database().ref(`conversations/${ids[i]}`).once('value', snapshot => {
              let messages = snapshot.val() || {};              
              let timestamps = Object.keys(messages);

              if (timestamps.length === 0) {
                this.setState({ unreadMessage: false });
                return;
              }

              let lastMessage = messages[timestamps[timestamps.length - 1]];

              if (lastMessage.sender !== user.userFB.id && !lastMessage.seen) {
                this.setState({ unreadMessage: true });
                return;
              } else {
                this.setState({ unreadMessage: false });
              }
            });
          }
        }
      });
    }
  }

  public componentWillUnmount() : void {
    if (this.ref) this.ref.off();
  }

  public checkFbStatus() {
    let that = this;
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        FB.api('/me?fields=email,name,link,picture', function(otherResponse: any) {
          const auth = response.authResponse;
          that.props.receiveUser({ auth, userFB: otherResponse, status: "connected" });
        });
      } else {
        that.props.receiveUser(null);
      }
    });
  }

  public logout(response: any) {
    this.props.receiveUser(null);
    window.location.replace("/");
  }

  public login(response: any) {
    let that = this;
    if (response.authResponse === null) return null;
    FB.api('/me?fields=email,name,link,picture', function(otherResponse: any) {
      const auth = response.authResponse;
      that.props.receiveUser({ auth, userFB: otherResponse, status: "connected" });
    });
    const accessToken = response.authResponse.accessToken;
    $.ajax({
      method: "POST",
      url: 'api/users/',
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
    return (
      <div className='home'>
        <NavBar unreadMessage={this.state.unreadMessage} />
          {this.props.children}
        <Footer />
      </div>
    )
  }
}


export default App;
