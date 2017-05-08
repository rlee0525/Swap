import Navbar from './component';
import { connect } from 'react-redux';
// import { loginUser, receiveUser } from 'modules/user/actions';

const mapStateToProps = ({ user }) => ({
  user,
  loggedIn: Boolean(user)
});

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(loginUser()),
  logout: () => dispatch(receiveUser(null))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
