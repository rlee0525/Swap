import React from 'react';
import { Link } from 'react-router';

interface Header {
  title: string;
  link: string;
}

interface Props {
  headers: Header[];
  active: string;
}

const DashboardHeaders : React.SFC<Props> = ({ active, headers }) => (
  <ul className="nav nav-tabs">
    { headers.map(header => (
      <li role="presentation" id="dashboard-nav-title" className={header.link === active ? 'active' : ''}>
        <Link to={`dashboard?${header.link}`}>{ header.title }</Link>
      </li>
    ))}
  </ul>
);

export { DashboardHeaders };