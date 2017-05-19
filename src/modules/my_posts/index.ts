import { connect } from 'react-redux';
import MyPosts from './component';

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
)(MyPosts);
