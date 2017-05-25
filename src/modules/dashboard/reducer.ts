import { merge } from 'lodash';
import { DASHBOARD } from "./actions";

let _defaultState = {
  myPosts: [],
  bookmarks: [],
  rfps: []
};

const postReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case DASHBOARD.MY_POSTS:
      return merge({}, state, {
        myPosts: state.myPosts.concat(action.posts)
      });
    case DASHBOARD.BOOKMARKS:
      return merge({}, state, {
        bookmarks: state.bookmarks.concat(action.bookmarks)
      });
    case DASHBOARD.RFPS:
      return merge({}, state, {
        rfps: state.rfps.concat(action.rfps)
      });
    default:
      return state;
  }
};

export default postReducer;
