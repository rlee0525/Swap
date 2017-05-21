import { connect } from 'react-redux';
import Infos from './component';

interface StateProps {
  user: any;
  page: object;
}

interface DispatchProps {
  onClick1: () => void;
}

const mapStateToProps = (state: any, ownProps?: any): StateProps => ({
  user: state.user,
  page: ownProps
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  onClick1: () => { console.log("hi"); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Infos);
