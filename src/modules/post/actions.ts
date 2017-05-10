import * as PostAPI from './utils';

export interface Action<T> {
  type: string;
  payload: T;
}

export const RECEIVE_POST: string = 'RECEIVE_POST';

export const receivePost = (post: object []) => ({
  type: RECEIVE_POST,
  post
});

export const getPost = (id: number) => dispatch => {
  return PostAPI.fetchPost(id).then(
    res => dispatch(receivePost(res))
  );
}
