import React from 'react';

interface Props {
  conversation: any[];
}

interface State {
}

class Messages extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    let { conversation } = this.props;
    return (
      <div className="chat-body">
        { conversation.map(msg => (
          <div className={`chat-message ${msg.sender === 0 ? 'mine-message' : 'other-message'}`}>
            <span>{ msg.message }</span>
            <img src="http://enadcity.org/enadcity/wp-content/uploads/2017/02/profile-pictures.png" />
          </div>
        ))}
      </div>
    );
  }
}

export { Messages };