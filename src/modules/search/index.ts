import { connect } from 'react-redux';
import Search from './component';
import { search, getPosts } from './actions';

interface StateProps {
  user: object;
  searchResult: object [];
}

interface DispatchProps {
  search: (query: string) => void;
  getPosts: (query: string) => void;
}

const mapStateToProps = (state: StateProps, ownProp?: any): StateProps => ({
  user: state.user,
  searchResult: state.searchResult
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  search: query => dispatch(search(query)),
  getPosts: query => dispatch(getPosts(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
