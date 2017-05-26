import * as DashboardAPI from './utils';

export const DASHBOARD = {
  MY_POSTS: 'MY_POSTS',
  DELETE_POST: 'DELETE_POST',
  BOOKMARKS: 'BOOKMARKS',
  DELETE_BOOKMARK: 'DELETE_BOOKMARK',
  RFPS: 'RFPS'
}

// my posts actions
export const receiveMyPosts = posts => ({
  type: DASHBOARD.MY_POSTS,
  posts
});

export const removeMyPost = id => ({
  type: DASHBOARD.DELETE_POST,
  id
});

export const fetchMyPosts = accessToken => dispatch => (
  DashboardAPI.fetchMyPosts(accessToken).then(
    res => dispatch(receiveMyPosts(res)),
    err => console.log(err)
  )
);

export const deleteMyPost = (id, accessToken) => dispatch => (
  DashboardAPI.deleteMyPost(id, accessToken).then(
    () => dispatch(removeMyPost(id)),
    err => console.log(err)
  )
);

// bookmark actions
export const receiveBookmarks = bookmarks => ({
  type: DASHBOARD.BOOKMARKS,
  bookmarks
});

export const removeBookmark = id => ({
  type: DASHBOARD.DELETE_BOOKMARK,
  id
});

export const fetchBookmarks = accessToken => dispatch => (
  DashboardAPI.fetchBookmarks(accessToken).then(
    res => dispatch(receiveBookmarks(res)),
    err => console.log(err)
  )
);

export const deleteBookmark = (id, accessToken) => dispatch => (
  DashboardAPI.deleteBookmark(id, accessToken).then(
    () => dispatch(removeBookmark(id)),
    err => console.log(err)
  )
);

export const receiveRfps = rfps => ({
  type: DASHBOARD.RFPS,
  rfps
});

