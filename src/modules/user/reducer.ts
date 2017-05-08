import { merge } from 'lodash';
import { Action, RECEIVE_USER } from "./actions";

let _defaultState = {};

const userReducer = (state = _defaultState, action: Action<any>) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
