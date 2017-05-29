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
          searchResult={this.props.searchResult}
          search={this.props.search}
          currentQuery={this.props.currentQuery}
          saveQuery={this.props.saveQuery}
          id={this.props.params.id}
          getPost={this.props.getPost}
          post={this.props.post}
          user={this.props.user}
          receivePost={this.props.receivePost}
        />
      </div>
    );
  }
}

export default Post;
