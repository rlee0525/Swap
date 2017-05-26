import React from 'react';
import { Link } from 'react-router';

const DashboardHeaders = () => (
  <ul className="nav nav-tabs">
    <li role="presentation" id="dashboard-nav-title">
      <Link to="dashboard/posts">Posts</Link>
    </li>

    <li role="presentation" id="dashboard-nav-title" className="active">
      <Link to="dashboard/bookmarks">Bookmarks</Link>
    </li>

    <li role="presentation" id="dashboard-nav-title">
      <Link to="dashboard/rfps">Alerts</Link>
    </li>

    <li role="presentation" id="dashboard-nav-title">
      <Link to="dashboard/mycourses">My Courses</Link>
    </li>
  </ul>
);

export { DashboardHeaders };
