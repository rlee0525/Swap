import { connect } from 'react-redux';
import PostForm from './component';

interface StateProps {
  user: any;
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
  mapDispatchToProps
)(PostForm);
