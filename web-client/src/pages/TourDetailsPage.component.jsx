import React, { Fragment } from 'react';

import HeaderNavigation from '../components/header/header-nav/HeaderNavigation.component';
import LinkNavigation from '../components/link-navigation/LinkNavigation.component';
import TourDetailsIntro from '../components/tour-details-intro/TourDetailsIntro.component';
import TourQuickSummary from '../components/tour-quick-summary/TourQuickSummary.component';

const TourDetailsPage = () => {
  return (
    <Fragment>
      <header className="header header--nav-only">
        <HeaderNavigation />
      </header>
      <LinkNavigation />
      <TourDetailsIntro />
      <TourQuickSummary />
    </Fragment>
  );
};

export default TourDetailsPage;
