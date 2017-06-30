import { connect, Dispatch } from 'react-redux';

import Home from './component';
import { IUser, IStoreState, IChat } from 'common/interfaces';
import { search, saveQuery } from 'modules/search/actions';
import { fetchFirebaseConversations } from 'common/actions';

interface StateProps {
  user: IUser;
  chat: IChat;
  searchResult: any;
  currentQuery: any;
}

interface DispatchProps {
  search: (query: object, access_token: string) => void;
  saveQuery: (query: string) => void;
  fetchFirebaseConversations: (user: object) => void;
}

const mapStateToProps = (state: IStoreState, ownProp?: any): StateProps => ({
  user: state.user,
  chat: state.chat,
  searchResult: state.searchResult,
  currentQuery: state.currentQuery
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchProps => ({
  search: (query, access_token) => dispatch(search(query)),
  saveQuery: query => dispatch(saveQuery(query)),
  fetchFirebaseConversations: user => dispatch(fetchFirebaseConversations(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
