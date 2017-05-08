// import * as UserAPI from './utils';

export interface Action<T> {
  type: string,
  payload: T
};
//
// interface ActionCreator<T> {
//   type: string,
//   (payload: T): Action<T>
// };
//
// const actionCreator = <T>(type: string): ActionCreator<T> => (<any>Object).assign((payload: T):any => ({type, payload}), {type})
//
// export const isType = <T>(action: Action<any>, actionCreator: ActionCreator<T>): action is Action<T> => action.type === actionCreator.type
//

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = (user: any) => ({
  type: RECEIVE_USER,
  user
});

export const loginUser = () => (dispatch: any) => {
  // UserAPI.authenticateUser(dispatch);
};
