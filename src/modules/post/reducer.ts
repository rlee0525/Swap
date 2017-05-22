import { merge } from 'lodash';
import { Action, RECEIVE_POST } from "./actions";

let _defaultState = null;

const postReducer = (state = _defaultState, action: Action<any>) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POST:
      return action.post;
    default:
      return state;
  }
};

export default postReducer;
