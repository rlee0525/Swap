import { merge } from 'lodash';
import { RECEIVE_QUERY } from "./actions";

let _defaultState: string = "";

const queryReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_QUERY:
      return action.query;
    default:
      return state;
  }
};

export default queryReducer;
