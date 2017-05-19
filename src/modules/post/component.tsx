import React from 'react';
import { PostDetail } from './subcomponents';

class Post extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    let paddingBot = {
      paddingBottom: 20
    };

    return (
      <div className="container" style={paddingBot}>
        <PostDetail
          id={this.props.params.id}
          getPost={this.props.getPost}
          post={this.props.post}
          {...this.props}
        />
      </div>
    );
  }
}

export default Post;
