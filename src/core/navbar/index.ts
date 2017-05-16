import { connect } from 'react-redux';
import NavBar from './component';

interface StateProps {
  user: any;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(NavBar);
