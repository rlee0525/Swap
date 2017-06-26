import React from 'react';

interface Props {
  type: string;
  class: string;
  click: any;
}

class Button extends React.Component<Props, {}> {
  render() {
    return (
      <button
        type="button"
        id="action-button"
        className={`btn btn-xs ${this.props.class}`}
        onClick={this.props.click}
      >
        {this.props.type}
      </button>
    );
  }
}

export { Button };