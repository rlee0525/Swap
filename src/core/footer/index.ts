import { connect } from 'react-redux';
import Footer from './component';

interface StateProps {
  user: any;
}

interface DispatchProps {
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  signup: user => dispatch(signup(user)),
  getUser: user => dispatch(getUser(user))
});

export default connect(
  null,
  null
)(Footer);


//TODO : delete all the useless state/actions
