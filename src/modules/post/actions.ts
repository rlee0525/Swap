import * as PostAPI from './utils';

export interface Action<T> {
  type: string;
  post: object;
  payload: T;
}

export const RECEIVE_POST: string = 'RECEIVE_POST';

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const getPost = (id: string, access_token: string) => dispatch => {
  return PostAPI.fetchPost(id, access_token).then(
    res => dispatch(receivePost(res))
  );
}