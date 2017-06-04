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
    
    return (
      <div className="chat-body">
        { timestamps.map(timestamp => (
          <div className={`chat-message ${conversation.messages[timestamp].sender === user.userFB.id ? 'mine-message' : 'other-message'}`}>
            <span>{ conversation.messages[timestamp].message }</span>
            <img src={user.userFB.picture.data.url} />
          </div>
        ))}
      </div>
    );
  }
}

export { Messages };