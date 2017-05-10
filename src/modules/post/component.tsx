import React from 'react';
import { PostDetail, PostForm } from './subcomponents';

class Post extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    //TODO: just for testing.
    this.state = {
      current: "post_detail"
    };

    this.clickDetail = this.clickDetail.bind(this);
    this.clickForm = this.clickForm.bind(this);
    this.renderSub = this.renderSub.bind(this);
  }

  public clickDetail() {
    this.setState({ current: "post_detail" });
  }

  public clickForm() {
    this.setState({ current: "post_form" });
  }

  public renderSub() {
    if (this.state.current === "post_detail") {
      return (
        <PostDetail />
      );
    } else {
      return (
        <PostForm />
      );
    }
  }

  public render() {
    return (
      <div className="container">
        <div className="row">
          <div onClick={this.clickDetail}>POST DETAIL</div>
          <div onClick={this.clickForm}>POST FORM</div>
        </div>

        <div>
          {this.renderSub()}
        </div>
      </div>
    );
  }
}

export default Post;
