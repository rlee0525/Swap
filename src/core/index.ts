import { connect } from 'react-redux';
import App from './component';

import { receiveUser } from './navbar/actions';
import { checkConversations } from 'modules/chat/actions';

interface StateProps {
  user: any;
  post: object;
}

interface DispatchProps {
  receiveUser: (user: object) => void;
  checkConversations: (user: object) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user,
  post: state.post
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  receiveUser: user => dispatch(receiveUser(user)),
  checkConversations: user => dispatch(checkConversations(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
