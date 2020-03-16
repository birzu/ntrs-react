import React, { Fragment } from 'react';

import HeaderNavigation from '../components/header/header-nav/HeaderNavigation.component';
import LinkNavigation from '../components/link-navigation/LinkNavigation.component';
import UserDetailsContainer from '../components/user-details/user-details-container/UserDetailsContainer.component';
import Footer from '../components/footer/Footer.component';

const UserProfilePage = () => {
  return (
    <Fragment>
      <header className="header header--nav-only">
        <HeaderNavigation />
      </header>
      <LinkNavigation />
      <UserDetailsContainer />
      <Footer />
    </Fragment>
  );
};

export default UserProfilePage;
