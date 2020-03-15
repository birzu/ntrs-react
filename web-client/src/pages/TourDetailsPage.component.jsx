import React, { Fragment } from 'react';

import HeaderNavigation from '../components/header/header-nav/HeaderNavigation.component';
import LinkNavigation from '../components/link-navigation/LinkNavigation.component';
import TourDetailsIntro from '../components/tour-details-intro/TourDetailsIntro.component';
import TourQuickSummary from '../components/tour-quick-summary/TourQuickSummary.component';
import TourDetails from '../components/tour-details/TourDetails.component';
import TourMapBox from '../components/tour-mapbox/TourMapbox.component';
import Footer from '../components/footer/Footer.component';

const TourDetailsPage = () => {
  return (
    <Fragment>
      <header className="header header--nav-only">
        <HeaderNavigation />
      </header>
      <LinkNavigation />
      <TourDetailsIntro />
      <TourQuickSummary />
      {
        // not rendering map box for now
      }
      <TourDetails />
      <Footer />
    </Fragment>
  );
};

export default TourDetailsPage;
