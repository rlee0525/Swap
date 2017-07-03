import React from 'react';

import { shortenString } from 'helpers';

interface Props {
  user: any;
  active: boolean;
  hasUnreadMessages: boolean;
  changeConversation: () => void;
}

class ConversationItem extends React.Component<Props, any> {
  render() {
    let { user, changeConversation, hasUnreadMessages, active } = this.props;
    let name = `${user.first_name} ${user.last_name}`;
    let width = window.innerWidth;
    
    return (
      <div 
        className={`conversation-item ${active ? 'active-chat' : ''} ${width <= 414 && 'mobile-c-item'}`} 
        onClick={changeConversation}
      >
        { hasUnreadMessages ? <div className='noti unread' /> : <div className='noti' /> }
        <img src={user.fb_picture} alt='Profile Picture' />
        <span className="chat-name-1">
          {shortenString(name, 15)}
        </span>
        <span className="chat-name-2">
          {shortenString(user.first_name, 7)}
        </span>
        <span className={width > 414 ? "hidden" : "mobile-c-name"}>
          {shortenString(name, 15)}
        </span>
      </div>
    )
  }
}

export { ConversationItem };