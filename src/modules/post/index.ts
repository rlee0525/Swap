import { connect } from 'react-redux';

import Post from './component';
import { getPost, receivePost } from './actions';
import { search, saveQuery } from 'modules/search/actions';
import { fetchFirebaseConversations } from 'common/actions';
import { IUser, IPost, IChat, 
         ISearchResult, ICurrentQuery } from 'common/interfaces';

interface StateProps {
  user: IUser;
  post: IPost;
  chat: IChat;
  searchResult: ISearchResult;
  currentQuery: ICurrentQuery;
}

interface DispatchProps {
  getPost: (id: number, access_token: string) => void;
  search: (query: object, access_token: string) => void;
  saveQuery: (query: string) => void;
  receivePost: (post: any) => void;
  fetchFirebaseConversations: (user: object) => void;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user,
  post: state.post,
  chat: state.chat,
  searchResult: state.searchResult,
  currentQuery: state.currentQuery
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPost: (id, access_token) => dispatch(getPost(id, access_token)),
  search: (query, access_token) => dispatch(search(query)),
  saveQuery: query => dispatch(saveQuery(query)),
  receivePost: post => dispatch(receivePost(post)),
  fetchFirebaseConversations: user => dispatch(fetchFirebaseConversations(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
