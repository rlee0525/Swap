import { connect } from 'react-redux';
import Browse from './component';
import { getPosts } from './actions';

interface StateProps {
  user: any;
  posts: object [];
}

interface DispatchProps {
  onClick1: () => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user,
  posts: state.posts
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPosts: () => dispatch(getPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
