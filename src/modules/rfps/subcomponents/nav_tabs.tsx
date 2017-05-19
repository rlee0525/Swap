import React from 'react';

const NavTabs = () => (
  <ul className="nav nav-tabs">
    <li role="presentation">
      <a href="#/dashboard/posts">Posts</a>
    </li>
    <li role="presentation">
      <a href="#/dashboard/bookmarks">Bookmarks</a>
    </li>
    <li role="presentation" className="active">
      <a href="#/dashboard/rfps">Alerts</a>
    </li>
    <div>
      <a href="#/rfps/create" className="btn btn-success nav-button">Create Alert</a>
    </div>
  </ul>
);

export { NavTabs };