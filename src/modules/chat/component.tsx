declare var $, Promise;

import React from 'react';
import * as firebase from 'firebase';
import autoBind from 'react-autobind';
import { keyBy, values } from 'lodash';

import { fetchConversations } from './utils';
import { LoadingSpinner } from 'common/components';
import { Messages, ConversationItem } from './subcomponents';

interface Props {
  user: any;
  location: {
    query: {
      id: string;
    }
  };
  fetchFirebaseConversations: any;
}

interface State {
  loading: boolean;
  unreadMessages: boolean;
  message: string;
  conversations: any;
  currentConversation: string;
}

class Chat extends React.Component<Props, State> {
  ref;
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      conversations: {},
      currentConversation: null,
      message: '',
      unreadMessages: false
    }

    autoBind(this);

    this.ref = null;
  }

  public componentDidMount() : void {
    let { user } = this.props;
    let conversationId = this.props.location.query.id;

    this.props.fetchFirebaseConversations(user);
  }

  public componentWillUnmount() : void {
    if (this.ref) this.ref.off();
  }

  public componentWillReceiveProps(newProps) {
    if (newProps.chat.conversations) {
      let conversations = newProps.chat.conversations;
      let unreadMessages = newProps.chat.unreadMessages;
      let currentConversation = Object.keys(conversations)[0];
      this.ref = firebase.database().ref(`conversations/${currentConversation}`); 

      this.setState({
        conversations,
        currentConversation,
        loading: false,
        unreadMessages
      });
    }
  }

  public sendMessage(message : string) : void {
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

  private handleKeyPress(e) : void {
    if (e.key === 'Enter' && this.state.message !== "") {
      this.sendMessage(this.state.message);
    }
  }

  private update(e) : void {
    if (e.target.value !== '\n') {
      this.setState({
        message: e.target.value
      });
    }
  }

  private changeConversation(conversation_id) {
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

  public render() : JSX.Element {
    console.log(this.state);
    
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