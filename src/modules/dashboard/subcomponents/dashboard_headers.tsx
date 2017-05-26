import React from 'react';
import { Link } from 'react-router';

interface Header {
  title: string;
  link: string;
}

interface Props {
  headers: Header[];
  active: string;
  button: null | { text: string; link: string }
}

const DashboardHeaders : React.SFC<Props> = ({ active, headers, button }) => (
  <ul className="nav nav-tabs">
    { headers.map(header => (
      <li role="presentation" id="dashboard-nav-title" className={header.link === active ? 'active' : ''}>
        <Link to={`dashboard?${header.link}`}>{ header.title }</Link>
      </li>
    ))}

    { button ?  (
      <div>
        <Link to={button.link} className="btn btn-clear nav-button" id="responsive-create-text">
          { button.title }
        </Link>
        <Link to={button.link} className="btn btn-clear nav-button" id="responsive-create-icon">
          <span className="glyphicon glyphicon-edit" aria-hidden="true" id="create-icon-button"/>
        </Link>
      </div>
    ) : null }
  </ul>
);

export { DashboardHeaders };