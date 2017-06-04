import React from 'react';
import * as firebase from 'firebase';
import autoBind from 'react-autobind';
import { firebaseConfig } from '../../../config/api_key';

import './styles.scss';
import { Messages } from './subcomponents';

interface Props {
  user: any;
}

interface State {
  loading: boolean;
  message: string;
  currentConversation: string;
  conversations: {
    [key: string]: string[];
  }
}

class Chat extends React.Component<Props, State> {
  ref;
  constructor(props) {
    super(props);

    firebase.initializeApp(firebaseConfig);

    this.state = {
      loading: true,
      conversations: {},
      currentConversation: null,
      message: ''
    }

    autoBind(this);

    this.ref = null;
  }

  componentDidMount() : void {

    // connect to firebase and listens for messages
    this.ref = firebase.database().ref('conversations'); 
    
    this.ref.on('value', snapshot => {
      let conversations = snapshot.val();

      let currentConversation = Object.keys(conversations)[0];

      this.setState({ 
        conversations, 
        loading: false,
        currentConversation
      });
    })
  }

  componentWillUnmount() : void {
    this.ref.off();
  }

  sendMessage(message : string) : void {
    let { currentConversation } = this.state;
    let { user } = this.props;

    let time = Date.now();
    let messageObj = {
      message,
      sender: user.userFB.id
    }

    this.setState({ 
      message: ''
    });

    firebase.database().ref(`conversations/${currentConversation}/${time}`).set(messageObj);
  }

  handleKeyPress(e) : void {
    if (e.key === 'Enter') {
      this.sendMessage(this.state.message);
    }
  }

  update(e) : void {
    if (e.target.value !== '\n') {
      this.setState({
        message: e.target.value
      });
    }
  }

  render() : JSX.Element {
    if (this.state.loading) {
      return (
        <div>Loading</div>
      );
    }

    let { currentConversation, conversations } = this.state;
    let { user } = this.props;

    return (
      <div className="container chat-container">
        <div className="chat-conversations">
          <div>
            person 1
          </div>

          <div>person 2</div>
        </div>

        <div className="chat-messages">
          <Messages
            conversation={conversations[currentConversation]}
            user={user}
          />

          <div className="chat-input">
            <textarea
              type="text"
              placeholder="Say something..."
              value={this.state.message}
              onKeyPress={this.handleKeyPress}
              onChange={this.update}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;