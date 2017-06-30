import { connect } from 'react-redux';

import Search from './component';
import { search, saveQuery } from './actions';

interface StateProps {
  user: object;
  searchResult: any;
  currentQuery: any;
}

interface DispatchProps {
  search: (query: object, access_token: string) => void;
  saveQuery: (query: string) => void;
}

const mapStateToProps = (state: StateProps, ownProp?: any): StateProps => ({
  user: state.user,
  searchResult: state.searchResult,
  currentQuery: state.currentQuery
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  search: (query) => dispatch(search(query)),
  saveQuery: query => dispatch(saveQuery(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
