import { connect } from 'react-redux';

import Search from './component';
import { search, saveQuery } from './actions';
import { IUser, IChat, ISearchResult, ICurrentQuery } from 'common/interfaces';
import { fetchFirebaseConversations } from 'common/actions';

interface StateProps {
  user: IUser;
  chat: IChat;
  searchResult: ISearchResult;
  currentQuery: ICurrentQuery;
}

interface DispatchProps {
  search: (query: object, access_token: string) => void;
  saveQuery: (query: string) => void;
  fetchFirebaseConversations: (user: object) => void;
}

const mapStateToProps = (state: StateProps, ownProp?: any): StateProps => ({
  user: state.user,
  chat: state.chat,
  searchResult: state.searchResult,
  currentQuery: state.currentQuery
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  search: (query) => dispatch(search(query)),
  saveQuery: query => dispatch(saveQuery(query)),
  fetchFirebaseConversations: user => dispatch(fetchFirebaseConversations(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
