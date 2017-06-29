import { connect } from 'react-redux';
import App from './component';

import { receiveUser } from './navbar/actions';
import { fetchFirebaseConversations } from 'modules/chat/actions';

interface StateProps {
  user: any;
  post: object;
}

interface DispatchProps {
  receiveUser: (user: object) => void;
  fetchFirebaseConversations: (user: object) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user,
  post: state.post
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  receiveUser: user => dispatch(receiveUser(user)),
  fetchFirebaseConversations: user => dispatch(fetchFirebaseConversations(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
