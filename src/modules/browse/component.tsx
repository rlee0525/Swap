import React from 'react';

class Browse extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      posts: []
    };
  }

  public componentDidMount() {
    this.props.getPosts();
  }

  public componentWillReceiveProps(newProps) {
    if (newProps.posts !== this.props.posts) {
      this.setState({ posts: newProps.posts });
    }
  }

  public render() {
    console.log(this.state.posts);
    return (
      <div>
        Results
      </div>
    );
  }
}

export default Browse;
