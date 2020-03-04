import React, { Fragment } from 'react';

import Header from '../components/header/Header.component';
import SectionAbout from '../components/section-about/SectionAbout.component';
import SectionFeatures from '../components/section-features/SectionFeatures.component';
import FeaturedTours from '../components/section-featured-tours/FeaturedTours.component';

const HomePage = () => {
  return (
    <Fragment>
      <Header homePage />
      <SectionAbout />
      <FeaturedTours />
    </Fragment>
  );
};

export default HomePage;
