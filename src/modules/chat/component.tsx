declare var $, Promise;

import React from 'react';
import * as firebase from 'firebase';
import autoBind from 'react-autobind';
import { keyBy, values } from 'lodash';

import { fetchConversations, fetchFirebaseConversations } from './utils';
import { LoadingSpinner } from 'common/components';
import { Messages, ConversationItem } from './subcomponents';

interface Props {
  user: any;
  location: {
    query: {
      id: string;
    }
  }
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
    fetchFirebaseConversations(user);
    
    let conversationId = this.props.location.query.id;

    fetchConversations(user.auth.accessToken).then(
      res => {
        let currentConversation;

        if (res.length === 0) {
          this.setState({ loading: false });
          return;
        };

        if (conversationId) {
          currentConversation = res.filter(conversation => (
            conversation.conversation_id === conversationId
          ));

          if (currentConversation.length === 0) {
            currentConversation = res[0].conversation_id;
          } else {
            currentConversation = currentConversation[0].conversation_id;
          }
        } else {
          currentConversation = res[0].conversation_id;
        }

        this.ref = firebase.database().ref(`conversations/${currentConversation}`); 

        let conversations : object = keyBy<object>(res, "conversation_id");
        let ids = Object.keys(conversations);
        let dataNeeded = [];

        for (let i = 0; i < ids.length; i++) {
          let data = firebase.database().ref(`conversations/${ids[i]}`).once('value', snapshot => {
            let messages = snapshot.val() || {};
            conversations[ids[i]].messages = messages;
            let timestamps = Object.keys(messages);
            
            if (timestamps.length === 0) {
              conversations[ids[i]].hasUnreadMessages = false;
              return;
            }

            let lastMessage = messages[timestamps[timestamps.length - 1]]

            if (lastMessage.sender !== user.userFB.id && !lastMessage.seen) {
              conversations[ids[i]].hasUnreadMessages = true;
              return;
            }
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
    if (this.ref) this.ref.off();
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
    if (e.key === 'Enter' && this.state.message !== "") {
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
    if (this.state.loading) return <LoadingSpinner />

    let { currentConversation, conversations } = this.state;
    let { user } = this.props;

    return (
      <div className="container chat-container">
        <div className="chat-conversations">
          <div className='chat-conversations-title'>
            Messages
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
          { Object.keys(conversations).length === 0 ? (
            <div id="messages-warning">You don't have any conversations.</div>
          ) :(
            <Messages
              conversation={conversations[currentConversation]}
              user={user}
            />
          )}

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