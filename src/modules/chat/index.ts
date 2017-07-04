import { connect } from 'react-redux';

import Chat from './component';
import { IUser, IPost, IChat } from 'common/interfaces';
import { fetchFirebaseConversations,
         deleteConversation } from 'common/actions';

interface StateProps {
  user: IUser;
  chat: IChat;
}

interface DispatchProps {
  fetchFirebaseConversations: (user: object) => void;
  deleteConversation: (id: string) => void;
}

const mapStateToProps = (state: any): StateProps => ({
  user: state.user,
  chat: state.chat
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  fetchFirebaseConversations: user => dispatch(fetchFirebaseConversations(user)),
  deleteConversation: id => dispatch(deleteConversation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
