import { connect } from 'react-redux';

import App from './component';
import { receiveUser } from './navbar/actions';
import { IUser, IPost, IChat } from 'common/interfaces';
import { fetchFirebaseConversations } from 'common/actions';

interface StateProps {
  user: IUser;
  post: IPost;
  chat: IChat;
}

interface DispatchProps {
  receiveUser: (user: object) => void;
  fetchFirebaseConversations: (user: object) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  chat: state.chat,
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
