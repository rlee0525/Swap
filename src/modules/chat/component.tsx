import React from 'react';
import './styles.scss';

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
      currentConversation: 1
    }
  }

  sendMessage(message) {
    this.setState({ conversations: {
      1: [...this.state.conversations[1], message]
    } });
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
          <div className="chat-body">
            { conversations[currentConversation].map(msg => (
              <div className={`chat-message ${msg.sender === 0 ? 'mine-message' : 'other-message'}`}>
                <span>{ msg.message }</span>
                <img src="http://enadcity.org/enadcity/wp-content/uploads/2017/02/profile-pictures.png" />
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input type="text" placeholder="Say something..." />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;