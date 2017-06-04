import React from 'react';
import * as firebase from 'firebase';
import autoBind from 'react-autobind';
import { keyBy, values } from 'lodash';
import { firebaseConfig } from '../../../config/api_key';

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
        let currentConversation = res[0].conversation_id;
        
        let conversations : object = keyBy<object>(res, "conversation_id");
        console.log(conversations);
        

        // connect to firebase and listens for messages
        this.ref = firebase.database().ref(`conversations/${currentConversation}`); 
        
        this.ref.on('value', snapshot => {
          let messages = snapshot.val() || {};

          conversations[currentConversation].messages = messages;

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

  changeConversation(conversation_id) {

    // connect to firebase and listens for messages
    this.ref = firebase.database().ref(`conversations/${conversation_id}`); 
    
    this.ref.on('value', snapshot => {
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

    console.log(this.state);

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