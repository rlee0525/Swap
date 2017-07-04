declare var $, Promise;

import React from 'react';
import autosize from 'autosize';
import * as firebase from 'firebase';
import autoBind from 'react-autobind';
import { keyBy, values } from 'lodash';

import { IUser, IChat } from 'common/interfaces';
import { createConversation } from 'common/utils';
import { LoadingSpinner } from 'common/components';
import { Messages, ConversationItem } from './subcomponents';

interface Props {
  user: IUser;
  location: {
    query: {
      id: string;
    }
  };
  chat: IChat;
  fetchFirebaseConversations: any;
  deleteConversation: any;
}

interface State {
  loading: boolean;
  unreadMessage: boolean;
  message: string;
  conversations: any;
  currentConversation: string;
  intervalId: any;
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
      unreadMessage: false,
      intervalId: null
    }

    autoBind(this);

    this.ref = null;
  }

  public componentDidMount() : void {
    let { user } = this.props;
    let conversationId = this.props.location.query.id;

    this.loadData();
    let intervalId = setInterval((this.loadData), 300000);
    this.setState({ intervalId });
  }

  private loadData() {
    this.props.user && this.props.fetchFirebaseConversations(this.props.user);
  }

  public componentWillUnmount() : void {
    clearInterval(this.state.intervalId);
    if (this.ref) this.ref.off();
  }

  public componentWillReceiveProps(newProps) {
    if (newProps.chat.conversations) {
      let conversations = newProps.chat.conversations;
      let unreadMessage = newProps.chat.unreadMessage;
      let currentConversation;

      if (!this.state.currentConversation) {
        currentConversation = Object.keys(conversations)[0];
      } else {
        currentConversation = this.state.currentConversation;
      }
      
      this.ref = firebase.database().ref(`conversations/${currentConversation}`); 

      this.setState({
        conversations,
        currentConversation,
        loading: false,
        unreadMessage
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

    createConversation(currentConversation, user.userFB.id);
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

    firebase.database().ref(`conversations/${conversation_id}`).once('value', snapshot => {
      let messages = snapshot.val() || {};

      Object.keys(messages).forEach(time => {
        firebase.database().ref(`conversations/${conversation_id}/${time}/seen`).set(true);
      });

      this.setState({
        currentConversation: conversation_id,
        conversations: {
          ...this.state.conversations,
          [conversation_id]: {
            ...this.state.conversations[conversation_id],
            hasUnreadMessages: false
          }
        }
      });
      this.props.fetchFirebaseConversations(this.props.user);
    })
  }

  public render() : JSX.Element {
    if (this.state.loading) return <LoadingSpinner />

    let { currentConversation, conversations } = this.state;
    let { user, chat } = this.props;
    let width = window.innerWidth;    

    autosize($('textarea'));
  
    return (
      <div className={`container chat-container ${width <= 414 && 'mobile-chat-container'}`}>
        <div className={`chat-conversations ${width <= 414 && 'mobile-conversations'}`}>
          <div className={width > 414 ? 'chat-conversations-title' : 'hidden'}>
            Messages
          </div>
          {values(conversations).map((conversation : any) => (
            <ConversationItem
              user={user}
              chat={chat}
              key={conversation.conversation_id}
              hasUnreadMessages={conversation.hasUnreadMessages}
              active={currentConversation === conversation.conversation_id}
              otherUser={conversation.other_user_info}
              changeConversation={() => this.changeConversation(conversation.conversation_id)}
              conversationId={conversation.conversation_id}
              deleteConversation={this.props.deleteConversation}
            />
          ))}
        </div>

        <div className={`chat-messages ${width > 414 ? 'no-border-left' : 'no-border-top'}`}>
          {Object.keys(conversations).length === 0 ? (
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
    )
  }
}

export default Chat;