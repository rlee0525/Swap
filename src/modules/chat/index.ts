import { connect } from 'react-redux';

import Chat from './component';
import { fetchFirebaseConversations } from 'common/actions';
import { IUser, IPost, IChat } from 'common/interfaces';

interface StateProps {
  user: IUser;
  chat: IChat;
}

interface DispatchProps {
  fetchFirebaseConversations: (user: object) => void;
}

const mapStateToProps = (state: any): StateProps => ({
  user: state.user,
  chat: state.chat
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  fetchFirebaseConversations: user => dispatch(fetchFirebaseConversations(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
