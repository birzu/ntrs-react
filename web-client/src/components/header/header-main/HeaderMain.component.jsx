import React from 'react';

import CustomButton from '../../custom-button/CustomButton.component';

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
        <CustomButton cls="ntrs-btn ntrs-btn--primary header__btn">
          Discover All Tours
        </CustomButton>
      </div>
    </div>
  );
};

export default HeaderMain;
