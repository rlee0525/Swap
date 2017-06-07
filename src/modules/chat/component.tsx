declare var Promise;
import React from 'react';
import * as firebase from 'firebase';
import autoBind from 'react-autobind';
import { keyBy, values } from 'lodash';

import './styles.scss';
import { Messages, ConversationItem } from './subcomponents';
import { fetchConversations } from './utils';

interface Props {
  user: any;
}

interface State {
  loading: boolean;
  message: string;
  currentConversation: string;
  conversations: any;
}

class Chat extends React.Component<Props, State> {
  ref;
  constructor(props) {
    super(props);
    
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
    let { user } = this.props;

    fetchConversations(user.auth.accessToken).then(
      res => {
        // update to render the correct conversation based on clicked post
        let currentConversation = res[1].conversation_id;

        this.ref = firebase.database().ref(`conversations/${currentConversation}`); 

        let conversations : object = keyBy<object>(res, "conversation_id");

        let ids = Object.keys(conversations);

        let dataNeeded = [];

        for (let i = 0; i < ids.length; i++) {
          
          let data = firebase.database().ref(`conversations/${ids[i]}`).once('value', snapshot => {
            
            let messages = snapshot.val() || {};
            conversations[ids[i]].messages = messages;

            let timestamps = Object.keys(messages);
            
            let hasUnreadMessages = messages[timestamps[timestamps.length - 1]].sender !== user.userFB.id;

            conversations[ids[i]].hasUnreadMessages = hasUnreadMessages;
            
          });

          dataNeeded.push(data);
        }

        Promise.all(dataNeeded).then(() => {
          this.setState({ 
            currentConversation,
            conversations, 
            loading: false,
          });
        });
      },
      err => console.log(err)
    );    
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
      sender: user.userFB.id,
      seen: false
    }

    this.setState({ 
      message: '',
      conversations: {
        ...this.state.conversations,
        [currentConversation]: {
          ...this.state.conversations[currentConversation],
          hasUnreadMessages: false,
          messages: {
            ...this.state.conversations[currentConversation].messages,
            [time]: messageObj
          }
        }
      }
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

  changeConversation(conversation_id) {
    this.ref.off();

    // connect to firebase and listens for messages
    this.ref = firebase.database().ref(`conversations/${conversation_id}`); 
    
    this.ref.once('value', snapshot => {
      let messages = snapshot.val() || {};

      this.setState({ 
        currentConversation: conversation_id,
        conversations: {
          ...this.state.conversations,
          [conversation_id]: {
            ...this.state.conversations[conversation_id],
            messages: messages
          }
        },
        loading: false
      }); 
    });
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
          <div className='chat-conversations-title'>
            Conversations
          </div>
          { values(conversations).map((conversation : any) => (
            <ConversationItem
              key={conversation.conversation_id}
              hasUnreadMessages={conversation.hasUnreadMessages}
              active={currentConversation === conversation.conversation_id}
              user={conversation.other_user_info}
              changeConversation={() => this.changeConversation(conversation.conversation_id)}
            />
          ))}
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