// import * as UserAPI from './utils';

export interface Action<T> {
  type: string;
  user: object;
  payload: T;
}
//
// interface ActionCreator<T> {
//   type: string,
//   (payload: T): Action<T>
// };

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = (user: object) => ({
  type: RECEIVE_USER,
  user
});

export const loginUser = () => (dispatch: any) => {
  // u UserAPI.authenticateUser(dispatch);
};
