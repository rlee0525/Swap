import React from 'react';

interface Props {
  user: any;
  hasUnreadMessages: boolean;
  changeConversation: () => void;
}

const ConversationItem : React.SFC<Props> = ({ user, changeConversation, hasUnreadMessages }) => (
  <div className={`conversation-item ${hasUnreadMessages ? 'unread' : ''}`} onClick={changeConversation}>
    <img src={user.fb_picture} alt='Profile Picture' />
    <span>{`${user.first_name} ${user.last_name}`}</span>
  </div>
);

export { ConversationItem };