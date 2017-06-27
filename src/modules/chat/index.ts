import { connect } from 'react-redux';
import Chat from './component';

interface StateProps {
  user: any;
}

const mapStateToProps = (state: any): StateProps => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(Chat);
