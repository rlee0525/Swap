import React from 'react';

class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  public componentDidMount() {
    console.log("hi");
  }

  public render() {
    console.log(this.props);

    return (
      <div>
        Hi
      </div>
    )
  }
}

export { PostDetail };
