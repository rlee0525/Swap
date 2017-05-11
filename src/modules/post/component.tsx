import React from 'react';
import { PostDetail } from './subcomponents';

class Post extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="container">
        <PostDetail id={this.props.params.id} getPost={this.props.getPost} post={this.props.post} />
      </div>
    );
  }
}

// TODO: this is a useless component. refactor it.

export default Post;
