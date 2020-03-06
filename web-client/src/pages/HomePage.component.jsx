import React, { Fragment } from 'react';

import Header from '../components/header/Header.component';
import SectionAbout from '../components/section-about/SectionAbout.component';
import SectionFeatures from '../components/section-features/SectionFeatures.component';
import SectionCta from '../components/section-cta/SectionCta.component';
import FeaturedTours from '../components/section-featured-tours/FeaturedTours.component';
import Footer from '../components/footer/Footer.component';

const HomePage = () => {
  return (
    <Fragment>
      <Header homePage />
      <SectionAbout />
      <FeaturedTours />
      <SectionFeatures />
      <Footer />
    </Fragment>
  );
};

export default HomePage;
