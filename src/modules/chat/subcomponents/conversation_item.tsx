declare var $;

import React from 'react';
import autoBind from 'react-autobind';

import { shortenString } from 'helpers';
import { IUser, IChat } from 'common/interfaces';

interface Props {
  user: IUser;
  chat: IChat;
  otherUser: any;
  active: boolean;
  hasUnreadMessages: boolean;
  conversationId: string;
  changeConversation: () => void;
  deleteConversation: any;
}

class ConversationItem extends React.Component<Props, any> {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  private archiveMessage(e, id) {
    e.stopPropagation();
    e.preventDefault(); 

    let that = this;

    $(function() {
      $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Yes": function() {
            $(this).dialog("close");

            let user = that.props.user;
            let user_id = user.userFB.id;
            let data = {
              conversation_id: id,
              user_id
            };

            $.ajax({
              method: 'DELETE',
              url: `api/conversations/${id}`,
              data
            }).then(res => {
              that.props.deleteConversation(id)
            })
          },
          Cancel: function() {
            $(this).dialog("close");
          }
        }
      });
    });
  }

  public render() {    
    let { otherUser, changeConversation, hasUnreadMessages, 
          active, conversationId } = this.props;
    let name = `${otherUser.first_name} ${otherUser.last_name}`;
    let width = window.innerWidth;
  
    return (
      <div 
        className={`conversation-item ${active ? 'active-chat' : ''} ${width <= 414 && 'mobile-c-item'}`} 
        onClick={changeConversation}
      >
        <div className={width > 414 ? `noti-container` : `mobile-noti-container`}>
          { hasUnreadMessages ? <div className='noti unread' /> : <div className='noti' /> }
        </div>
        <div className="img-container">
          <img src={otherUser.fb_picture} alt='Profile Picture' />
        </div>
        <div className={`chat-info-container ${width <= 414 && "mobile-i-container"}`}>
          <span className="chat-name-1">
            {shortenString(name, 15)}
          </span>
          <span className="chat-name-2">
            {shortenString(otherUser.first_name, 7)}
          </span>
          <span className={width > 414 ? "hidden" : "mobile-c-name"}>
            {shortenString(name, 15)}
          </span>
          <span 
            className={
                `glyphicon glyphicon-remove archive-conversation${width <= 768 ? "-small" : ""} 
                ${width <= 414 && 'hidden'}`
              }
            aria-hidden="true"
            onClick={e => this.archiveMessage(e, conversationId)}
          />
        </div>
        <div className="archive-container">
          <span 
            className={`glyphicon glyphicon-remove ${width > 414 ? "hidden" : "mobile-archive"}`}
            aria-hidden="true"
            onClick={e => this.archiveMessage(e, conversationId)}
          />
        </div>

        <div className="no-display" id="dialog-confirm">
          Archive this message?
        </div> 
      </div>
    )
  }
}

export { ConversationItem };