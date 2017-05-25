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

export const fetchBookmarks = accessToken => dispatch => (
  DashboardAPI.fetchBookmarks(accessToken).then(
    res => dispatch(receiveMyPosts(res)),
    err => console.log(err)
  )
);

export const receiveBooksmarks = bookmarks => ({
  type: DASHBOARD.BOOKMARKS,
  bookmarks
});

export const receiveRfps = rfps => ({
  type: DASHBOARD.RFPS,
  rfps
});
