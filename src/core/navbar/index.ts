import { connect } from 'react-redux';
import NavBar from './component';
import { signup, getUser } from 'modules/user/actions';

interface StateProps {
  user: object;
}

interface DispatchProps {
  signup: (user: object) => void;
  getUser: (user: object) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  signup: user => dispatch(signup(user)),
  getUser: user => dispatch(getUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
