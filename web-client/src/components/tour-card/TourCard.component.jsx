import React from 'react';

import TourImg from '../../assets/mountain-hiker_1.jpg';

import SvgIconSelector from '../svg-icon-selector/SvgIconSelector.component';
import CustomButton from '../custom-button/CustomButton.component';

const renderTourDetails = (key, value) => (
  <p className="ntrs-tour-card__details-title">
    <strong>{key}</strong>
    <span
      className={`ntrs-tour-card__details-value ntrs-tour-card__details-value--${key}`}
    >
      {value}
    </span>
  </p>
);

const renderTourDescription = (icName, value) => (
  <figure className="ntrs-tour-card__description">
    <SvgIconSelector
      cls={`ntrs-tour-card__icon tour-card__icon--${icName}`}
      icName={icName}
    />
    <figcaption className="ntrs-tour-card__description-val">{value}</figcaption>
  </figure>
);

const TourCard = ({ size }) => {
  return (
    <div className={`ntrs-tour-card ntrs-tour-card--${size}`}>
      <div className="ntrs-tour-card__img">&nbsp;</div>
      <h4 className="ntrs-tour-card__tour-name heading-4">
        <span>The Mountain Hiker</span>
      </h4>
      <div className="ntrs-tour-card__details">
        {renderTourDetails('difficulty'.toUpperCase(), 'Easy')}
        {renderTourDetails('duration'.toUpperCase(), '7 Days')}
      </div>
      <div className="ntrs-tour-card__summary">
        Exploring the jaw-dropping US east coast by foot and by boat.
      </div>
      <div className="ntrs-tour-card__description-wrapper">
        {renderTourDescription('map', 'Miami, USA')}
        {renderTourDescription('calendar', 'April 2021')}
        {renderTourDescription('flag', '4 Stops')}
        {renderTourDescription('iconmonstr-user-6', 'Upto 15 members')}
      </div>
      <div className="ntrs-tour-card__rating-box">
        <p className="ntrs-tour-card__price">
          Price
          <span>
            <strong>$699.97</strong>
          </span>
        </p>
        <p className="ntrs-tour-card__rating">
          Rating
          <span>
            <strong>4.8</strong>
          </span>
        </p>
        <CustomButton cls="ntrs-btn ntrs-btn--success ntrs-tour-card__btn">
          Details
        </CustomButton>
      </div>
    </div>
  );
};

export default TourCard;
