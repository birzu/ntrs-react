import React, { Fragment } from 'react';

import HeaderNavigation from './header-nav/HeaderNavigation.component';
import HeaderMain from './header-main/HeaderMain.component';

const Header = ({ homePage }) => {
  return (
    <header className="header">
      {!homePage ? (
        <HeaderNavigation />
      ) : (
        <Fragment>
          <HeaderNavigation />
          <HeaderMain />
        </Fragment>
      )}
    </header>
  );
};

export default Header;
