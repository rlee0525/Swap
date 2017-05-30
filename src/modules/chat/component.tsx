import React from 'react';
import './styles.scss';
import { Messages } from './subcomponents';

interface Props {
}

interface State {
}

class Chat extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      conversations: {
        1: [
          { message: 'what is up', sender: 1 },
          { message: 'nothing much', sender: 0 },
          { message: 'want to do something', sender: 1 },
          { message: 'not really', sender: 0 },
          { message: 'maybe tomorrow? But probably not, because you are very boring. So please let me alone', sender: 0 },
          { message: 'no thanks', sender: 1 },
          { message: 'you sob', sender: 0 }
        ]
      },
      currentConversation: 1,
      message: ''
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.update = this.update.bind(this);
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
            <input
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