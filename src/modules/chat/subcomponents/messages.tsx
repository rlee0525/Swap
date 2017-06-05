import React from 'react';
import { IUser } from 'common/interfaces';

interface Props {
  conversation : any;
  user : IUser;
}

class Messages extends React.Component<Props, {}> {

  render() {
    let { conversation, user } = this.props;

    let timestamps = Object.keys(conversation.messages).reverse();
    console.log(conversation);
    
    return (
      <div className="chat-body">
        { timestamps.map(timestamp => {
          let isMyMessage = conversation.messages[timestamp].sender === user.userFB.id;
          return (
            <div className={`chat-message ${isMyMessage ? 'mine-message' : 'other-message'}`}>
              <span>{ conversation.messages[timestamp].message }</span>
              <img src={isMyMessage ? user.userFB.picture.data.url : conversation.other_user_info.fb_picture } />
            </div>
          )
        })}
      </div>
    );
  }
}

export { Messages };