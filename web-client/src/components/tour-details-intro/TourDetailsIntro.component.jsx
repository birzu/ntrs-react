import React from 'react';

import SvgIconSelector from '../svg-icon-selector/SvgIconSelector.component';
import TourQuickSummary from '../tour-quick-summary/TourQuickSummary.component';

import TourImg from '../../assets/hero-alternate.jpg';

import './TourDetailsIntro.styles.scss';

const TourDetailsIntro = () => {
  return (
    <section className="section-tour-intro">
      <div className="tour-details">
        <h2 className="tour-details__title u-mt-sm">The Forest Hiker</h2>
        <div className="tour-details__detail-box">
          <div className="tour-details__duration">
            <SvgIconSelector
              icName="clock"
              cls="tour-details__icon tour-details__icon--clock"
            />
            <span>14 days</span>
          </div>
          <div className="tour-details__location">
            <SvgIconSelector
              icName="pin"
              cls="tour-details__icon tour-details__icon--map"
            />
            <span>California, USA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourDetailsIntro;
