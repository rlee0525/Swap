import { merge } from 'lodash';
import { Action, RECEIVE_SEARCH } from "./actions";

let _defaultState = {};

const searchReducer = (state = _defaultState, action: Action<any>) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH:
      return action.result;
    default:
      return state;
  }
};

export default searchReducer;