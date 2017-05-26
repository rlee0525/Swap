import { connect } from 'react-redux';
import Post from './component';
import { getPost } from './actions';
import { search, saveQuery } from './actions';

interface StateProps {
  user: any;
  post: object;
  searchResult: any;
  currentQuery: any;
}

interface DispatchProps {
  getPost: (id: number, access_token: string) => void;
  search: (query: object) => void;
  saveQuery: (query: string) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user,
  post: state.post,
  searchResult: state.searchResult,
  currentQuery: state.currentQuery
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPost: (id, access_token) => dispatch(getPost(id, access_token)),
  search: query => dispatch(search(query)),
  saveQuery: query => dispatch(saveQuery(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
