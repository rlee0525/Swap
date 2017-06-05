import React from 'react';
import firebase from 'firebase';
import { IUser } from 'common/interfaces';

interface Props {
  conversation : any;
  user : IUser;
}

class Messages extends React.Component<Props, {}> {

  render() {
    let { conversation, user } = this.props;

    let timestamps = Object.keys(conversation.messages).reverse();
    let firstUnseen = 0;
    let firstSeen = 0;
    
    return (
      <div className="chat-body">
        { timestamps.map(timestamp => {
          let currentMessage = conversation.messages[timestamp];
          let isMyMessage = currentMessage.sender === user.userFB.id;

          if (!isMyMessage && !currentMessage.seen) {
            firebase.database().ref(`conversations/${conversation.conversation_id}/${timestamp}/seen`).set(true); 
          }

          if (isMyMessage && !currentMessage.seen) {
            firstUnseen++;
          }

          if (isMyMessage && currentMessage.seen) {
            firstSeen++;
          }

          console.log(isMyMessage);
          console.log(currentMessage);
          

          return (
            <div className={`chat-message`}>
              <div className={`chat-message-body ${isMyMessage ? 'mine-message' : 'other-message'}`}>
                <span>{ conversation.messages[timestamp].message }</span>
                <img src={isMyMessage ? user.userFB.picture.data.url : conversation.other_user_info.fb_picture } />
              </div>

              { firstUnseen === 1 ? <div className="chat-receipt"><i>delivered</i></div> : null }
              { firstSeen === 1 ? <div className="chat-receipt"><i>seen</i></div> : null }
            </div>
          )
        })}
      </div>
    );
  }
}

export { Messages };