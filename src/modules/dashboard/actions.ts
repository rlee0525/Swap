import * as DashboardAPI from './utils';

export const DASHBOARD = {
  MY_POSTS: 'dashboard/MY_POSTS',
  DELETE_MY_POST: 'dashboard/DELETE_MY_POST',
  BOOKMARKS: 'dashboard/BOOKMARKS',
  DELETE_BOOKMARK: 'dashboard/DELETE_BOOKMARK',
  RFPS: 'dashboard/RFPS',
  DELETE_RFPS: 'dashboard/DELETE_RFPS',
  MY_COURSES: 'dashboard/MY_COURSES',
  DELETE_MY_COURSE: 'dashboard/DELETE_MY_COURSE',
  COURSES: 'dashboard/COURSES',
  ADD_MY_COURSE: 'dashboard/ADD_MY_COURSE'
}

// my posts actions
export const receiveMyPosts = posts => ({
  type: DASHBOARD.MY_POSTS,
  posts
});

export const removeMyPost = id => ({
  type: DASHBOARD.DELETE_MY_POST,
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

export const removeRfps = id => ({
  type: DASHBOARD.DELETE_RFPS,
  id
});

export const fetchRfps = accessToken => dispatch => (
  DashboardAPI.fetchRfps(accessToken).then(
    res => dispatch(receiveRfps(res)),
    err => console.log(err)
  )
);

export const deleteRfps = (id, accessToken) => dispatch => (
  DashboardAPI.deleteRfps(id, accessToken).then(
    () => dispatch(removeRfps(id)),
    err => console.log(err)
  )
);

// my courses actions
export const receiveMyCourses = myCourses => ({
  type: DASHBOARD.MY_COURSES,
  myCourses
});

export const removeMyCourse = id => ({
  type: DASHBOARD.DELETE_MY_COURSE,
  id
});

export const addMyCourse = myCourse => ({
  type: DASHBOARD.ADD_MY_COURSE,
  myCourse
});

export const fetchMyCourses = accessToken => dispatch => (
  DashboardAPI.fetchMyCourses(accessToken).then(
    res => dispatch(receiveMyCourses(res)),
    err => console.log(err)
  )
);

export const deleteMyCourse = (id, accessToken) => dispatch => (
  DashboardAPI.deleteMyCourse(id, accessToken).then(
    () => dispatch(removeMyCourse(id)),
    err => console.log(err)
  )
);

export const postMyCourse = (course_number, accessToken) => dispatch => (
  DashboardAPI.postMyCourse(course_number, accessToken).then(
    myCourse => dispatch(addMyCourse(myCourse)),
    err => console.log(err)
  )
);

// courses actions
export const receiveCourses = courses => ({
  type: DASHBOARD.COURSES,
  courses
});

export const fetchCourses = () => dispatch => (
  DashboardAPI.fetchCourses().then(
    res => dispatch(receiveCourses(res)),
    err => console.log(err)
  )
);
