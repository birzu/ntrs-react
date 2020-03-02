import React from 'react';

import HeaderNavigation from './header-nav/HeaderNavigation.component';
import HeaderMain from './header-main/HeaderMain.component';

const Header = () => {
  return (
    <header className="header">
      <HeaderNavigation />
      <HeaderMain />
    </header>
  );
};

export default Header;
