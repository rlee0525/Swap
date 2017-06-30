declare var $;

import React from 'react';
import { hashHistory } from 'react-router';

import { IUser, IDashboard } from 'common/interfaces';
import { DashboardHeaders, Bookmarks, MyPosts, Rfps, AlertForm, MyCourses } from './subcomponents';

const data = require('./dashboard_data.json');

interface Props {
  location: {
    search: string;
  },
  user: IUser;
  dashboard: IDashboard;
  fetchBookmarks : (accessToken: string) => JQueryPromise<void>;
  deleteBookmark : (id: number, accessToken: string) => JQueryPromise<void>;
  fetchMyPosts : (accessToken: string) => JQueryPromise<void>;
  deleteMyPost : (id: number, accessToken: string) => JQueryPromise<void>;
  fetchRfps : (accessToken: string) => JQueryPromise<void>;
  deleteRfps : (id: number, accessToken: string) => JQueryPromise<void>;
  receiveRfps : (rfps: any) => void;
  fetchMyCourses : (accessToken: string) => JQueryPromise<void>;
  deleteMyCourse : (id: number, accessToken: string) => JQueryPromise<void>;
  fetchCourses : () => JQueryPromise<void>;
  postMyCourse : (description: string, accessToken: string) => JQueryPromise<void>;
}

class Dashboard extends React.Component<Props, {}> {
  renderSubcomponent() {
    let page = this.props.location.search.slice(1);
    let { dashboard, user } = this.props;

    switch (page) {
      case 'bookmarks':
      let { fetchBookmarks, deleteBookmark } = this.props;
      
        return (
          <Bookmarks
            bookmarks={dashboard.bookmarks}
            fetchBookmarks={fetchBookmarks}
            deleteBookmark={deleteBookmark}
            user={user}
          />
        );
      case 'rfps':
        let { fetchRfps, deleteRfps } = this.props;

        return (
          <Rfps
            user={user}
            rfps={dashboard.rfps}
            fetchRfps={fetchRfps}
            deleteRfps={deleteRfps}
          />
        );
      case 'mycourses':
      const { fetchMyCourses, deleteMyCourse,
        fetchCourses, postMyCourse } = this.props;

        return (
          <MyCourses
            user={user}
            myCourses={dashboard.myCourses}
            courses={dashboard.courses}
            fetchMyCourses={fetchMyCourses}
            deleteMyCourse={deleteMyCourse}
            fetchCourses={fetchCourses}
            postMyCourse={postMyCourse}
          />
        )
      default:
        let { fetchMyPosts, deleteMyPost } = this.props;

        return (
          <MyPosts
            user={user}
            myPosts={dashboard.myPosts}
            fetchMyPosts={fetchMyPosts}
            deleteMyPost={deleteMyPost}
          />
        );
    }
  }

  public createAlert() {
    $('#createAlertModal').modal('show');
  }

  render() {
    let page = this.props.location.search.slice(1);
    let { user } = this.props;
    let button = null;

    if (page === 'rfps') {
      button = { title: 'Create Alert', action: () => $('#createAlertModal').modal('show') }
    } else if (page === 'posts') {
      button = { title: 'Create Post', action: () => hashHistory.push('posts/create') }
    } else if (page === 'mycourses') {
      button = { title: 'Add Course', action: () => $('#createMyCourse').modal('show') }
    }

    return (
      <div className="container">
        <DashboardHeaders
          headers={data.dashboardHeaders}
          active={page}
          button={button}
        />
        <AlertForm user={user} receiveRfps={this.props.receiveRfps} />
        { this.renderSubcomponent() }
      </div>
    );
  }
}

export default Dashboard;
