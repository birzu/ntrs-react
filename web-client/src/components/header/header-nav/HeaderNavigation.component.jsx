import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SvgIconSelector from '../../svg-icon-selector/SvgIconSelector.component';
import logo from '../../../assets/logo-green-small-2x.png';

import CustomButton from '../../custom-button/CustomButton.component';

import './HeaderNavigation.styles.scss';

const HeaderNavigation = () => {
  const [shouldStick, setShouldStick] = useState(false);
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
    >
      <img className="header__logo" src={logo} alt="natours logo"></img>
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
        <SvgIconSelector
          cls="header__icon header__icon--search"
          icName="magnifier"
        />
      </div>
      <ul className="header__nav-list header__nav-list--1">
        <li className="header__nav-list-item">
          <Link className="ntrs-link header__nav-link">Home</Link>
        </li>
        <li className="header__nav-list-item">
          <Link className="ntrs-link header__nav-link">Tours</Link>
        </li>
      </ul>
      <div className="header__nav-list-divider"></div>
      <ul className="header__nav-list header__nav-list--2">
        <li className="header__nav-list-item">
          <CustomButton cls="ntrs-btn ntrs-btn--login header__nav-btn">
            Sign in
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
          <SvgIconSelector
            cls="nav__support-icon nav__support-icon--email"
            icName="email-2"
          />
          support@natours.com
        </p>
        <p className="nav__support nav__support--phone">
          <SvgIconSelector
            cls="nav__support-icon nav__support-icon--phone"
            icName="phone"
          />
          999-999-9999
        </p>
      </div>
    </div>
  );
};

export default HeaderNavigation;
