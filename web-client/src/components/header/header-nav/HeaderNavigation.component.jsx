import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as IconSearch } from '../../../assets/iconmonstr-magnifier-4.svg';
import { ReactComponent as IconEmail } from '../../../assets/iconmonstr-email-12.svg';
import { ReactComponent as IconPhone } from '../../../assets/iconmonstr-phone-3.svg';
import logo from '../../../assets/logo-green-small-2x.png';

import CustomButton from '../../custom-button/CustomButton.component';

import './HeaderNavigation.styles.scss';

const HeaderNavigation = () => {
  const [shouldStick, setShouldStick] = useState(false);
  const headerRef = useRef(null);
  const handleScroll = () => {
    setShouldStick(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      style={{ display: 'flex' }}
      className={`${
        shouldStick ? 'header__navigation--sticky' : 'header__navigation'
      }`}
      ref={headerRef}
    >
      <img className="header__logo" src={logo} alt="natours logo"></img>
      <ul className="header__nav-list header__nav-list--1">
        <li className="header__nav-list-item">
          <Link className="ntrs-link header__nav-link" to="#">
            Home
          </Link>
          <div className="nav-border"></div>
        </li>
        <li className="header__nav-list-item">
          <Link className="ntrs-link header__nav-link" to="#">
            Destinations
          </Link>
          <div className="nav-border"></div>
        </li>
        <li className="header__nav-list-item">
          <Link className="ntrs-link header__nav-link" to="#">
            About
          </Link>
          <div className="nav-border"></div>
        </li>
      </ul>
      <div className="header__search-box">
        <input
          type="search"
          className="header__input header__input--search"
          id="header-input-search"
          placeholder="search tours"
        ></input>
        <label
          className="header__label header__label--search"
          htmlFor="header-input-search"
        >
          search tours
        </label>
        <IconSearch className="header__icon header__icon--search" />
      </div>
      <ul className="header__nav-list header__nav-list--2">
        <li className="header__nav-list-item">
          <CustomButton cls="ntrs-btn ntrs-btn--login header__nav-btn">
            Log in
          </CustomButton>
        </li>
        <li className="header__nav-list-item">
          <CustomButton cls="ntrs-btn ntrs-btn--register header__nav-btn">
            Register
          </CustomButton>
        </li>
      </ul>
      <div className="nav__support">
        <p className="nav__support nav__support--email">
          <IconEmail className="nav__support-icon nav__support-icon--email" />
          support.tours@natours.com
        </p>
        <p className="nav__support nav__support--phone">
          <IconPhone className="nav__support-icon nav__support-icon--phone" />
          999-999-9999
        </p>
      </div>
    </div>
  );
};

export default HeaderNavigation;
