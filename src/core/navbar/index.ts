import { connect } from 'react-redux';

import NavBar from './component';
import { receiveUser } from './actions';
import { IUser, IChat } from 'common/interfaces';

interface StateProps {
  user: IUser;
  chat: IChat;
}

interface DispatchProps {
  receiveUser: (user: object) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user,
  chat: state.chat
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  receiveUser: user => dispatch(receiveUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
