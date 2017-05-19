export interface Action<T> {
  type: string;
  user: object;
  payload: T;
}

export const RECEIVE_USER: string = 'RECEIVE_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});
