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
