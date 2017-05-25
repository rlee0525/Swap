import { merge } from 'lodash';
import { DASHBOARD } from "./actions";

let _defaultState = {
  myPosts: {
    fetched: false,
    list: []
  },
  bookmarks: {
    fetched: false,
    list: []
  },
  rfps: {
    fetched: false,
    list: []
  }
};

const dashboardReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  console.log(action);
  
  switch (action.type) {
    case DASHBOARD.MY_POSTS:
      return merge({}, state, {
        myPosts: {
          fetched: true,
          list: state.myPosts.list.concat(action.posts)
        }
      });
    case DASHBOARD.BOOKMARKS:
      return merge({}, state, {
        bookmarks: {
          fetched: true,
          list: state.bookmarks.list.concat(action.bookmarks)
        }
      });
    case DASHBOARD.DELETE_BOOKMARK:

      let newState = merge({}, state);

      newState.bookmarks.list = newState.bookmarks.list.filter(bookmark => {
        return bookmark.id !== action.id
      });

      return newState;
    case DASHBOARD.RFPS:
      return merge({}, state, {
        rfps: {
          fetched: true,
          list: state.rfps.list.concat(action.rfps)
        }
      });
    default:
      return state;
  }
};

export default dashboardReducer;
