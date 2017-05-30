import React from 'react';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../../config/api_key';

import './styles.scss';
import { Messages } from './subcomponents';

interface Props {
}

interface State {
}

class Chat extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    firebase.initializeApp(firebaseConfig);

    this.state = {
      loading: true,
      conversations: {},
      currentConversation: null,
      message: ''
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('conversations').once('value').then(snapshot => {
      let conversations = snapshot.val();

      let currentConversation = Object.keys(conversations)[0];

      this.setState({ 
        conversations, 
        loading: false,
        currentConversation
      });
      
    });
  }

  sendMessage(message) {
    this.setState({ 
      conversations: {
        1: [...this.state.conversations[1], { message, sender: 0 }]
      },
      message: ''
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMessage(this.state.message);
    }
  }

  update(e) {
    this.setState({
      message: e.target.value
    });
  }

  render() {
    let { currentConversation, conversations } = this.state;

    if (this.state.loading) {
      return (
        <div>Loading</div>
      );
    }

    return (
      <div className="container chat-container">
        <div className="chat-conversations">
          <div>
            person 1
          </div>

          <div>person 2</div>
        </div>

        <div className="chat-messages">
          <Messages conversation={conversations[currentConversation]} />

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