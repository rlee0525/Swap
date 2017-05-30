import React from 'react';

interface Props {
}

interface State {
}

class Chat extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container chat-container">
        <div className="chat-conversations">
          <div>
            person 1
          </div>

          <div>person 2</div>
        </div>

        <div className="chat-messages">
          <div>message 1</div>
          <div>message 1</div>
          <div>message 1</div>
          <div>message 1</div>

          <div className="chat-input">
            <input type="text"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;