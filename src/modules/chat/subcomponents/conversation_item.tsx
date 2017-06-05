import React from 'react';

interface Props {
  user: any;
  changeConversation: () => void;
}

const ConversationItem : React.SFC<Props> = ({ user, changeConversation }) => (
  <div className='conversation-item' onClick={changeConversation} >
    <img src={user.fb_picture} alt='Profile Picture' />
    <span>{`${user.first_name} ${user.last_name}`}</span>
  </div>
);

export { ConversationItem };