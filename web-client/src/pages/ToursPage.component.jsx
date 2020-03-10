import React, { Fragment } from 'react';

import HeaderNavigation from '../components/header/header-nav/HeaderNavigation.component';
import TourSearchSidebar from '../components/tour-search-sidebar/TourSearchSidebar.component';
import ToursContainer from '../components/tours-container/ToursContainer.component';
import SlidesContaner from '../components/slide-container/SlideContainer.component';
import LinkNavigation from '../components/link-navigation/LinkNavigation.component';

const TourPage = () => {
  return (
    <Fragment>
      <header className="header header--nav-only">
        <HeaderNavigation />
      </header>
      <LinkNavigation />
      <SlidesContaner />
      <TourSearchSidebar />
      <ToursContainer />
    </Fragment>
  );
};

export default TourPage;
