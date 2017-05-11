import * as BrowseAPI from './utils';

export interface Action<T> {
  type: string;
  user: object;
  payload: T;
}

export const RECEIVE_POSTS: string = 'RECEIVE_POSTS';

export const receivePosts = (posts: object []) => ({
  type: RECEIVE_POSTS,
  posts
});

export const getPosts = (query: string) => dispatch => {
  return BrowseAPI.fetchPosts(query).then(
    res => dispatch(receivePosts(res))
  );
}
