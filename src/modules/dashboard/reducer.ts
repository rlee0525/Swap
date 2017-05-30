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
  },
  myCourses: {
    fetched: false,
    list: []
  },
  courses: {
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
    case DASHBOARD.DELETE_MY_POST:

      let newStateMyPost = merge({}, state);

      newStateMyPost.myPosts.list = newStateMyPost.myPosts.list.filter(myPost => {
        return myPost.id !== action.id
      });

      return newStateMyPost;
    case DASHBOARD.BOOKMARKS:
      return merge({}, state, {
        bookmarks: {
          fetched: true,
          list: state.bookmarks.list.concat(action.bookmarks)
        }
      });
    case DASHBOARD.DELETE_BOOKMARK:

      let newStateBookmark = merge({}, state);

      newStateBookmark.bookmarks.list = newStateBookmark.bookmarks.list.filter(bookmark => {
        return bookmark.id !== action.id
      });

      return newStateBookmark;
    case DASHBOARD.RFPS:
      return merge({}, state, {
        rfps: {
          fetched: true,
          list: state.rfps.list.concat(action.rfps)
        }
      });
    case DASHBOARD.DELETE_RFPS:

      let newStateRfps = merge({}, state);

      newStateRfps.rfps.list = newStateRfps.rfps.list.filter(rfps => {
        return rfps.id !== action.id
      });

      return newStateRfps;
    case DASHBOARD.MY_COURSES:
      return merge({}, state, {
        myCourses: {
          fetched: true,
          list: state.myCourses.list.concat(action.myCourses)
        }
      })
    case DASHBOARD.DELETE_MY_COURSE:

      let newState = merge({}, state);

      newState.myCourses.list = newState.myCourses.list.filter(myCourses => {
        return myCourses.id !== action.id
      });

      return newState;
    case DASHBOARD.ADD_MY_COURSE:
      return merge({}, state, {
        myCourses: {
          fetched: true,
          list: state.myCourses.list.concat(action.myCourse)
        }
      })
    case DASHBOARD.COURSES:
      return merge({}, state, {
        courses: {
          fetched: true,
          list: state.courses.list.concat(action.courses)
        }
      })
    default:
      return state;
  }
};

export default dashboardReducer;
