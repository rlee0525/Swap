import { connect } from 'react-redux';
import Post from './component';
import

interface StateProps {
  user: any;
  post: object [];
}

interface DispatchProps {
  onClick1: () => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPost: (id: number) => dispatch(getPost(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
