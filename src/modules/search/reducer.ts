import { merge } from 'lodash';
import { Action, RECEIVE_SEARCH, RECEIVE_POSTS } from "./actions";

let _defaultState = [];

const searchResultReducer = (state = _defaultState, action: Action<any>) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH:
      return action.result;
    case RECEIVE_POSTS:
      return action.posts;
    default:
      return state;
  }
};

export default searchResultReducer;
