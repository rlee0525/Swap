import { connect } from 'react-redux';
import { Dispatch } from 'react-redux';

import Dashboard from './component';
import { IUser, IStoreState, IChat } from 'common/interfaces';
import { fetchFirebaseConversations } from 'common/actions';
import { fetchBookmarks, deleteBookmark,
         fetchMyPosts, deleteMyPost,
         fetchRfps, deleteRfps, receiveRfps,
         fetchMyCourses, deleteMyCourse,
         fetchCourses, postMyCourse } from './actions';

interface StateProps {
  user : IUser;
  chat: IChat;
  dashboard: any;
}

interface DispatchProps {
  fetchBookmarks: (accessToken: string) => void;
  deleteBookmark: (id: number, accessToken: string) => void;
  fetchMyPosts: (accessToken: string) => void;
  deleteMyPost: (id: number, accessToken: string) => void;
  fetchRfps: (accessToken: string) => void;
  deleteRfps: (id: number, accessToken: string) => void;
  receiveRfps: (rfps: any) => void;
  fetchMyCourses: (accessToken: string) => void;
  deleteMyCourse: (id: number, accessToken: string) => void;
  fetchCourses: () => void;
  postMyCourse: (description: string, accessToken: string) => JQueryPromise<void>;
  fetchFirebaseConversations: (user: object) => void;
}

const mapStateToProps = (state: IStoreState, ownProp?: any): StateProps => ({
  user: state.user,
  dashboard: state.dashboard,
  chat: state.chat
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchProps => ({
  fetchBookmarks: accessToken => dispatch(fetchBookmarks(accessToken)),
  deleteBookmark: (id, accessToken) => dispatch(deleteBookmark(id, accessToken)),
  fetchMyPosts: accessToken => dispatch(fetchMyPosts(accessToken)),
  deleteMyPost: (id, accessToken) => dispatch(deleteMyPost(id, accessToken)),
  fetchRfps: (accessToken) => dispatch(fetchRfps(accessToken)),
  deleteRfps: (id, accessToken) => dispatch(deleteRfps(id, accessToken)),
  receiveRfps: (rfps) => dispatch(receiveRfps(rfps)),
  fetchMyCourses: accessToken => dispatch(fetchMyCourses(accessToken)),
  deleteMyCourse: (id, accessToken) => dispatch(deleteMyCourse(id, accessToken)),
  fetchCourses: () => dispatch(fetchCourses()),
  postMyCourse: (description, accessToken) => dispatch(postMyCourse(description, accessToken)),
  fetchFirebaseConversations: user => dispatch(fetchFirebaseConversations(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
