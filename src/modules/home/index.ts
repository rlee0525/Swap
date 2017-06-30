import { connect, Dispatch } from 'react-redux';

import Home from './component';
import { IUser, IStoreState } from 'common/interfaces';
import { search, saveQuery } from 'modules/search/actions';

interface StateProps {
  user: object;
  searchResult: any;
  currentQuery: any;
}

interface DispatchProps {
  search: (query: object, access_token: string) => void;
  saveQuery: (query: string) => void;
}

const mapStateToProps = (state: IStoreState, ownProp?: any): StateProps => ({
  user: state.user,
  searchResult: state.searchResult,
  currentQuery: state.currentQuery
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchProps => ({
  search: (query, access_token) => dispatch(search(query)),
  saveQuery: query => dispatch(saveQuery(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
