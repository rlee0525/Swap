import { connect } from 'react-redux';
import MyPosts from './component';

interface StateProps {
  user: any;
}

interface DispatchProps {
  onClick1: () => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);
