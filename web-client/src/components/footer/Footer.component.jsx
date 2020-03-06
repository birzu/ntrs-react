import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo-green-2x.png';

const Footer = () => {
  return (
    <footer className="footer">
      <img className="footer__logo" src={Logo} alt="natours logo"></img>
      <div className="footer__nav">
        <ul className="footer__nav-list">
          <li className="footer__nav-list-item">
            <Link className="footer__link ntrs-link" to="#">
              Tours
            </Link>
          </li>
          <li className="footer__nav-list-item">
            <Link className="footer__link ntrs-link" to="#">
              About
            </Link>
          </li>
          <li className="footer__nav-list-item">
            <Link className="footer__link ntrs-link" to="#">
              Carrers
            </Link>
          </li>
          <li className="footer__nav-list-item">
            <Link className="footer__link ntrs-link" to="#">
              Partners
            </Link>
          </li>
          <li className="footer__nav-list-item">
            <Link className="footer__link ntrs-link" to="#">
              Terms
            </Link>
          </li>
          <li className="footer__nav-list-item">
            <Link className="footer__link ntrs-link" to="#">
              Contact us
            </Link>
          </li>
        </ul>
        <p className="footer__copyright">
          &copy; Copyright Natours. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
