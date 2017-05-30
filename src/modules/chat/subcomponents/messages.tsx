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
    let { conversation, user } = this.props;
    return (
      <div className="chat-body">
        { Object.keys(conversation).map(timestamp => (
          <div className={`chat-message ${conversation[timestamp].sender === user.userFB.id ? 'mine-message' : 'other-message'}`}>
            <span>{ conversation[timestamp].message }</span>
            <img src="http://enadcity.org/enadcity/wp-content/uploads/2017/02/profile-pictures.png" />
          </div>
        ))}
      </div>
    );
  }
}

export { Messages };