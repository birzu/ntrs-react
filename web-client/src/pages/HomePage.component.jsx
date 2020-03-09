import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectModalHidden,
  selectCurrentModal
} from '../redux/selectors/modal.selectors';

import Header from '../components/header/Header.component';
import SectionAbout from '../components/section-about/SectionAbout.component';
import SectionFeatures from '../components/section-features/SectionFeatures.component';
import SectionCta from '../components/section-cta/SectionCta.component';
import CtaModal from '../components/cta-modal/CtaModal.component';
import FeaturedTours from '../components/section-featured-tours/FeaturedTours.component';
import Footer from '../components/footer/Footer.component';

const mapStateToProps = createStructuredSelector({
  modalHidden: selectModalHidden,
  currentModalName: selectCurrentModal
});

const HomePage = ({ modalHidden, currentModalName }) => {
  const renderModal = () => {
    return currentModalName === 'Cta' ? <CtaModal /> : null;
  };

  return (
    <Fragment>
      <Header homePage />
      <SectionAbout />
      <FeaturedTours />
      <SectionFeatures />
      <Footer />
      {!modalHidden ? renderModal() : null}
    </Fragment>
  );
};

export default connect(mapStateToProps, null)(HomePage);
