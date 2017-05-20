import React from 'react';
import { Link } from 'react-router';

const NavTabs = () : JSX.Element => (
  <ul className="nav nav-tabs">
    <li role="presentation" id="dashboard-nav-title">
      <Link to="dashboard/posts">Posts</Link>
    </li>
    <li role="presentation" id="dashboard-nav-title">
      <Link to="dashboard/bookmarks">Bookmarks</Link>
    </li>
    <li role="presentation" id="dashboard-nav-title" className="active">
      <Link to="dashboard/rfps">Alerts</Link>
    </li>
    <div>
      <Link to="dashboard/rfps/create" className="btn btn-clear nav-button">
        Create Alert
      </Link>
    </div>
  </ul>
);

export { NavTabs };