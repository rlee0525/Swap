import React from 'react';

interface Props {
  user: any;
  active: boolean;
  hasUnreadMessages: boolean;
  changeConversation: () => void;
}

const ConversationItem : React.SFC<Props> = ({ user, changeConversation, hasUnreadMessages, active }) => (
  <div className={`conversation-item ${active ? 'active-chat' : ''}`} onClick={changeConversation}>
    { hasUnreadMessages ? <div className='noti unread' /> : <div className='noti' /> }
    <img src={user.fb_picture} alt='Profile Picture' />
    <span>{`${user.first_name} ${user.last_name}`}</span>
  </div>
);

export { ConversationItem };