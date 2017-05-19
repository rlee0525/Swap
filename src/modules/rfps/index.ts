import { connect } from 'react-redux';
import RFP from './component';

interface StateProps {
  user: object;
}

interface DispatchProps {
  onClick1: () => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  onClick1: () => { console.log("hi"); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RFP);
