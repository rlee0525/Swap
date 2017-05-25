import * as DashboardAPI from './utils';

export const DASHBOARD = {
  MY_POSTS: 'MY_POSTS',
  BOOKMARKS: 'BOOKMARKS',
  DELETE_BOOKMARK: 'DELETE_BOOKMARK',
  RFPS: 'RFPS'
}

export const receiveMyPosts = posts => ({
  type: DASHBOARD.MY_POSTS,
  posts
});

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

