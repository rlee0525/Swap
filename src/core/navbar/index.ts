import { connect } from 'react-redux';

import NavBar from './component';
import { receiveUser } from './actions';
import { IUser, IChat } from 'common/interfaces';
import { fetchFirebaseConversations } from 'modules/chat/actions';

interface StateProps {
  user: IUser;
  chat: IChat;
}

interface DispatchProps {
  receiveUser: (user: object) => void;
  fetchFirebaseConversations: (user: object) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user,
  chat: state.chat
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  receiveUser: user => dispatch(receiveUser(user)),
  fetchFirebaseConversations: user => dispatch(fetchFirebaseConversations(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
