import * as UserAPI from './utils';

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

export const signup = user => dispatch => (
  UserAPI.signup(user)
    .then(currentUser => dispatch(receiveUser(currentUser)))
    .fail(err => console.log(err))
);

export const getUser = user => dispatch => (
  UserAPI.checkUser(user)
    .then(currentUser => dispatch(receiveUser(currentUser)))
    .fail(err => console.log(err))
);
