import React from 'react';

import UIButton from '../../core-ui/button/UIButton';

import './HeaderMain.styles.scss';

const HeaderMain = () => {
  return (
    <div className="header__main">
      <div className="header__main-wrapper">
        <h1 className="header__heading heading-1">
          <span className="header__heading-span header__heading-span--primary">
            Outdoors
          </span>
          <span className="header__heading-span header__heading-span--secondary">
            Is where life happens
          </span>
        </h1>
        <UIButton style={{ marginLeft: '-.8rem' }} modifier="main">
          Discover All Tours
        </UIButton>
      </div>
    </div>
  );
};

export default HeaderMain;
