import * as DashboardAPI from './utils';

export const DASHBOARD = {
  MY_POSTS: 'MY_POSTS',
  BOOKMARKS: 'BOOKMARKS',
  RFPS: 'RFPS'
}

export const receiveMyPosts = posts => ({
  type: DASHBOARD.MY_POSTS,
  posts
});

export const receiveBookmarks = bookmarks => ({
  type: DASHBOARD.BOOKMARKS,
  bookmarks
});

export const fetchBookmarks = accessToken => dispatch => (
  DashboardAPI.fetchBookmarks(accessToken).then(
    res => dispatch(receiveBookmarks(res)),
    err => console.log(err)
  )
);

export const receiveRfps = rfps => ({
  type: DASHBOARD.RFPS,
  rfps
});
