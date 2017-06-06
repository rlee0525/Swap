import * as React from 'react';
import { Link } from 'react-router';

const Footer = () => (
  <div className="block block-bordered-lg" id="footer-block">
    <div className="container">
      <div className="row">
        <Link to="infos?about" className="col-xs-3 text-center margin-bottom-md no-hover">
          <h6 className="text-uppercase">About</h6>
        </Link>
        <Link to="infos?careers" className="col-xs-3 text-center margin-bottom-md no-hover">
          <h6 className="text-uppercase">Careers</h6>
        </Link>
        <Link to="infos?faq" className="col-xs-3 text-center margin-bottom-md no-hover">
          <h6 className="text-uppercase">FAQ</h6>
        </Link>
        <Link to="infos?contact" className="col-xs-3 text-center margin-bottom-md no-hover">
          <h6 className="text-uppercase">Contact</h6>
        </Link>
      </div>
    </div>
  </div>
);

export default Footer;
