import { connect } from 'react-redux';
import Footer from './component';

interface StateProps {
  user: any;
}

interface DispatchProps {
  // onClick1: () => void;
  // signup: user =>
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  // onClick1: () => { console.log("hi"); }
  signup: user => dispatch(signup(user)),
  getUser: user => dispatch(getUser(user))
});

export default connect(
  null,
  null
)(Footer);


//TODO : delete all the useless state/actions
