import { connect } from 'react-redux';
import Terms from './component';

interface StateProps {
  user: any;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(Terms);
