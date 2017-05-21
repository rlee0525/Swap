import { connect } from 'react-redux';
import RFP from './component';

interface StateProps {
  user: object;
}

interface DispatchProps {
  
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  
});

export default connect(
  mapStateToProps,
  null
)(RFP);
