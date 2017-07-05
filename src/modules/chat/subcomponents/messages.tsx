import React from 'react';
import firebase from 'firebase';

import { IUser } from 'common/interfaces';
import { LoadingSpinner } from 'common/components';

interface Props {
  conversations: any;
  conversation : any;
  user : IUser;
}

class Messages extends React.Component<Props, {}> {
  
  render() {
    if (!this.props.conversation) return <LoadingSpinner />
    
    let { conversation, user } = this.props;
    let timestamps = Object.keys(conversation.messages).reverse();
    let renderedDelivered = false;
    let renderedSeen = false;
    
    return (
      <div className="chat-body">
        {timestamps.map(timestamp => {
          let currentMessage = conversation.messages[timestamp];
          let isMyMessage = currentMessage.sender === user.userFB.id;
          let receipt = null;

          if (!isMyMessage && !currentMessage.seen) {
            firebase.database()
                    .ref(`conversations/${conversation.conversation_id}/${timestamp}/seen`)
                    .set(true); 
          }

          if (isMyMessage && !currentMessage.seen && !renderedDelivered) {
            renderedDelivered = true;
            receipt = <div className="chat-receipt"><i>delivered</i></div>;
          }

          if (isMyMessage && currentMessage.seen && !renderedSeen) {
            renderedSeen = true;
            receipt = <div className="chat-receipt"><i>seen</i></div>;
          }
          
          return (
            <div className={`chat-message`}>
              <div className={`chat-message-body ${isMyMessage ? 'mine-message' : 'other-message'}`}>
                <span>{ conversation.messages[timestamp].message }</span>
                <img src={isMyMessage ? 
                            user.userFB.picture.data.url : 
                            conversation.other_user_info.fb_picture } 
                />
              </div>

              { receipt }
            </div>
          )
        })}

        <div id="messages-warning">
          Conversation with {`${conversation.other_user_info.first_name} ${conversation.other_user_info.last_name}`}
        </div>
      </div>
    );
  }
}

export { Messages };