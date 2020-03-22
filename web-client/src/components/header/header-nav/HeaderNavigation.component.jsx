import React from 'react';
import { Link } from 'react-router-dom';

import useFormModalNavigation from '../../../hooks/useFormModalNavigation';
import useStickHeader from '../../../hooks/useStickyHeader';

import SvgIconSelector from '../../svg-icon-selector/SvgIconSelector.component';
import UIButton from '../../core-ui/button/UIButton';

import logo from '../../../assets/logo-green-small-2x.png';
import './HeaderNavigation.styles.scss';

const HeaderNavigation = () => {
  const shouldStick = useStickHeader();
  const {
    handleClickOnRegister,
    handleClickOnSignin
  } = useFormModalNavigation();

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
          <Link className="ntrs-link header__nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="header__nav-list-item">
          <Link className="ntrs-link header__nav-link" to="/tours">
            Tours
          </Link>
        </li>
      </ul>
      <div className="header__nav-list-divider"></div>
      <ul className="header__nav-list header__nav-list--2">
        <li className="header__nav-list-item">
          <UIButton modifier="login" onClick={handleClickOnSignin}>
            Sign in
          </UIButton>
        </li>
        <li className="header__nav-list-item">
          <UIButton modifier="register" onClick={handleClickOnRegister}>
            register
          </UIButton>
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
