import React, { Fragment } from 'react';

import Header from '../components/header/Header.component';
import SectionAbout from '../components/section-about/SectionAbout.component';

const HomePage = () => {
  return (
    <Fragment>
      <Header homePage />
      <SectionAbout />
    </Fragment>
  );
};

export default HomePage;
