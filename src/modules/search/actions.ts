import * as SearchAPI from './utils';

export interface Action<T> {
  type: string;
  result: object;
  posts: object [];
  payload: T;
}

export const RECEIVE_SEARCH: string = 'RECEIVE_SEARCH';

export const receiveSearch = (result: object []) => ({
  type: RECEIVE_SEARCH,
  result
});

export const search = (query: string) => (dispatch: any) => {
  return SearchAPI.search(query).then(
    (res: object[]) => dispatch(receiveSearch(res))
  );
}

export const RECEIVE_POSTS: string = 'RECEIVE_POSTS';

export const receivePosts = (posts: object []) => ({
  type: RECEIVE_POSTS,
  posts
});

export const getPosts = (query: string) => dispatch => {
  return SearchAPI.fetchPosts(query).then(
    res => dispatch(receivePosts(res))
  );
}
