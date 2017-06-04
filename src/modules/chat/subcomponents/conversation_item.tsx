import React from 'react';

interface Props {
  user: any;
}

const ConversationItem : React.SFC<Props> = ({ user }) => (
  <div className='conversation-item'>
    <img src={user.fb_picture} alt='Profile Picture' />
    <span>{`${user.first_name} ${user.last_name}`}</span>
  </div>
);

export { ConversationItem };