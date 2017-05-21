import * as React from 'react';
import { Link } from 'react-router';

const Footer = () => (
  <div className="block block-bordered-lg" id="footer-block">
    <div className="container">
      <div className="row">
        <Link to="about" className="col-xs-3 text-center margin-bottom-md">
          <h6 className="text-uppercase">About</h6>
        </Link>
        <Link to="careers" className="col-xs-3 text-center margin-bottom-md">
          <h6 className="text-uppercase">Careers</h6>
        </Link>
        <Link to="faq" className="col-xs-3 text-center margin-bottom-md">
          <h6 className="text-uppercase">FAQ</h6>
        </Link>
        <Link to="contact" className="col-xs-3 text-center margin-bottom-md">
          <h6 className="text-uppercase">Contact</h6>
        </Link>
      </div>
    </div>
  </div>
);

export default Footer;
