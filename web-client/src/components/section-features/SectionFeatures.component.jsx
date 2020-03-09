import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FeatureCard from '../feature-card/FeatureCard.component';
import CustomButton from '../custom-button/CustomButton.component';

import './SectionFeatures.styles.scss';
import { setCurrentModal, showModal } from '../../redux/reducers/modal.reducer';

const FEATURE_CARD_TEXTS = [
  'Variety of tours all across the world. You can choose your own experience based on your need.',
  'Professional and experienced guides to help you along in the tour so that you can have the best experience.',
  'We bring you close to nature. Take a break from your busy life an enjoy the beauty of nature.'
];

const mapDispatchToProps = dispatch => ({
  setModalName: modalName => dispatch(setCurrentModal(modalName)),
  showModal: () => dispatch(showModal())
});

const SectionFeatures = ({ showModal, setModalName }) => {
  return (
    <section className="section-features">
      <h2 className="heading-2 heading-2--primary section-features__heading u-mb-md">
        Why Natours ?
      </h2>
      <div className="section-features__card section-features__card--1">
        <FeatureCard
          icName="globe"
          title="Explore the world"
          text={FEATURE_CARD_TEXTS[0]}
        />
      </div>
      <div className="section-features__card section-features__card--2">
        <FeatureCard
          icName="guide"
          title="Expert Guides"
          text={FEATURE_CARD_TEXTS[1]}
        />
      </div>
      <div className="section-features__card section-features__card--3">
        <FeatureCard
          icName="heart"
          title="Live a healthy life"
          text={FEATURE_CARD_TEXTS[2]}
        />
      </div>
      <CustomButton
        type="button"
        cls="ntrs-btn ntrs-btn--primary--alternate section-features__btn"
        onClick={e => {
          e.stopPropagation();
          setModalName('Cta');
          showModal();
        }}
      >
        Contact Now
      </CustomButton>
    </section>
  );
};

export default connect(null, mapDispatchToProps)(SectionFeatures);
