import { connect } from 'react-redux';
import Post from './component';
import { getPost } from './actions';

interface StateProps {
  user: any;
  post: object;
}

interface DispatchProps {
  getPost: (id: number, access_token: string) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user,
  post: state.post
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPost: (id, access_token) => dispatch(getPost(id, access_token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
