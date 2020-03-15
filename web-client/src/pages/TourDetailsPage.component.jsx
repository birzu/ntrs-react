import React, { Fragment } from 'react';

import HeaderNavigation from '../components/header/header-nav/HeaderNavigation.component';
import LinkNavigation from '../components/link-navigation/LinkNavigation.component';
import TourDetailsIntro from '../components/tour-details-intro/TourDetailsIntro.component';
import TourQuickSummary from '../components/tour-quick-summary/TourQuickSummary.component';
import TourMapBox from '../components/tour-mapbox/TourMapbox.component';
import Footer from '../components/footer/Footer.component';
import TourReviews from '../components/tour-reviews/TourReviews.component';

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
        <TourMapBox />
      }
      <TourReviews />
      <Footer />
    </Fragment>
  );
};

export default TourDetailsPage;
