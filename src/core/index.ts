import { connect } from 'react-redux';
import App from './component';

import { receiveUser } from './navbar/actions';

interface StateProps {
  user: any;
  post: object;
}

interface DispatchProps {
  receiveUser: (user: object) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user,
  post: state.post
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  receiveUser: user => dispatch(receiveUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
