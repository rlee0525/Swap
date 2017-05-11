import { merge } from 'lodash';
import { Action, RECEIVE_POSTS } from "./actions";

let _defaultState = [];

const postsReducer = (state = _defaultState, action: Action<any>) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    default:
      return state;
  }
};

export default postsReducer;
