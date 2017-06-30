import * as React from 'react';
import { Link } from 'react-router';
import autoBind from 'react-autobind';

import { IUser, IChat } from 'common/interfaces';

class Footer extends React.Component<any, any> {
  constructor(props) {
    super(props); 

    autoBind(this);
  }

  private fetchConversation() {
    this.props.user && this.props.fetchFirebaseConversations(this.props.user);
  }

  public render() {
    return (
      <div className="block block-bordered-lg absolute-footer" id="footer-block">
        <div className="container">
          <div className="row">
            <Link 
              to="infos?about" 
              className="col-xs-3 text-center margin-bottom-md no-hover"
              onClick={this.fetchConversation}
            >
              <h6 className="text-uppercase">About</h6>
            </Link>
            <Link 
              to="infos?careers" 
              className="col-xs-3 text-center margin-bottom-md no-hover"
              onClick={this.fetchConversation}
            >
              <h6 className="text-uppercase">Careers</h6>
            </Link>
            <Link 
              to="infos?faq" 
              className="col-xs-3 text-center margin-bottom-md no-hover"
              onClick={this.fetchConversation}
            >
              <h6 className="text-uppercase">FAQ</h6>
            </Link>
            <Link 
              to="infos?contact" 
              className="col-xs-3 text-center margin-bottom-md no-hover"
              onClick={this.fetchConversation}
            >
              <h6 className="text-uppercase">Contact</h6>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;
