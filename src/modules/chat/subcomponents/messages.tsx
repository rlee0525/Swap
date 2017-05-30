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

    let timestamps = Object.keys(conversation).reverse();
    
    return (
      <div className="chat-body">
        { timestamps.map(timestamp => (
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