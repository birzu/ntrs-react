import React, { Fragment, lazy, Suspense } from 'react';

import HeaderNavigation from '../components/header/header-nav/HeaderNavigation.component';
import LinkNavigation from '../components/link-navigation/LinkNavigation.component';
import TourDetailsIntro from '../components/tour-details-intro/TourDetailsIntro.component';
import TourQuickSummary from '../components/tour-quick-summary/TourQuickSummary.component';
import Footer from '../components/footer/Footer.component';
import TourDetails from '../components/tour-details/TourDetails.component';
import TourReviews from '../components/tour-reviews/TourReviews.component';

const TourMapBox = lazy(() =>
  import('../components/tour-mapbox/TourMapbox.component')
);

const TourDetailsPage = () => {
  return (
    <Fragment>
      <header className="header header--nav-only">
        <HeaderNavigation />
      </header>
      <LinkNavigation />
      <TourDetailsIntro />
      <TourQuickSummary />
      <TourDetails />
      <Suspense fallback={<div>Loding</div>}>
        <TourMapBox />
      </Suspense>
      <TourReviews />
      <Footer />
    </Fragment>
  );
};

export default TourDetailsPage;
