import { connect } from 'react-redux';

import Footer from './component';
import { IUser, IChat } from 'common/interfaces';
import { fetchFirebaseConversations } from 'common/actions';

interface StateProps {
  user: IUser;
  chat: IChat;
}

interface DispatchProps {
  fetchFirebaseConversations: (user: object) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  chat: state.chat,
  user: state.user,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  fetchFirebaseConversations: user => dispatch(fetchFirebaseConversations(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);