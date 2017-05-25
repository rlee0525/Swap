import React from 'react';
import { Link } from 'react-router';

interface Header {
  title: string;
  link: string;
  active: boolean;
}

interface Props {
  headers: Header[];
}

const DashboardHeaders : React.SFC<Props> = ({ headers }) => (
  <ul className="nav nav-tabs">
    { headers.map(header => (
      <li role="presentation" id="dashboard-nav-title" className={header.active ? 'active' : ''}>
        <Link to={`dashboard?${header.link}`}>{ header.title }</Link>
      </li>
    ))}
  </ul>
);

export { DashboardHeaders };