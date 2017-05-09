import { connect } from 'react-redux';
import NavBar from './component';
import { signup } from 'modules/user/actions';

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
  signup: user => dispatch(signup(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
