import React from 'react';

import ReviewContainer from '../review-stars-container/ReviewContainer.component';
import SvgIconSelector from '../svg-icon-selector/SvgIconSelector.component';
import CustomButton from '../custom-button/CustomButton.component';

const renderTourDetails = (key, value, clsName) => (
  <p className={`${clsName}__details-title`}>
    <strong>{key}</strong>
    <span
      className={`${clsName}__details-value ${clsName}__details-value--${key}`}
    >
      {value}
    </span>
  </p>
);

const renderTourDescription = (icName, value, clsName) => (
  <figure className={`${clsName}__description`}>
    <SvgIconSelector
      cls={`${clsName}__icon tour-card__icon--${icName}`}
      icName={icName}
    />
    <figcaption className={`${clsName}__description-val`}>{value}</figcaption>
  </figure>
);

const TourCard = ({ size, rating }) => {
  const clsName = size ? `ntrs-tour-card-${size}` : 'ntrs-tour-card';
  return (
    <div className={`${clsName}`}>
      <div className={`${clsName}__img`}>&nbsp;</div>
      <h4 className={`${clsName}__tour-name heading-4`}>
        <span>The Mountain Hiker</span>
      </h4>
      <div className={`${clsName}__details`}>
        <div className={`${clsName}__details-group`}>
          {renderTourDetails('difficulty'.toUpperCase(), 'Easy', clsName)}
        </div>
        <div className={`${clsName}__details-group`}>
          {renderTourDetails('duration'.toUpperCase(), '7 Days', clsName)}
        </div>
        <div className={`${clsName}__details-group`}>
          <p className={`${clsName}__rating`}>
            Rating
            <span>
              <strong>4.5</strong>
            </span>
          </p>
        </div>
        <div className={`${clsName}__details-group`}>
          <ReviewContainer
            cls={`${clsName}__review-rating}`}
            size={size}
            rating={rating}
          />
        </div>
      </div>
      <div className={`${clsName}__summary`}>
        Exploring the jaw-dropping US east coast by foot and by boat.
      </div>
      <div className={`${clsName}__description-wrapper`}>
        {renderTourDescription('map', 'Miami, USA', clsName)}
        {renderTourDescription('calendar', 'April 2021', clsName)}
        {renderTourDescription('flag', '4 Stops', clsName)}
        {renderTourDescription('user', 'Upto 15 members', clsName)}
      </div>
      <div className={`${clsName}__rating-box`}>
        <p className={`${clsName}__price`}>
          Price
          <span>
            <strong>$699.97</strong>
          </span>
        </p>
        <CustomButton cls={`ntrs-btn ntrs-btn--success ${clsName}__btn`}>
          Details
        </CustomButton>
      </div>
    </div>
  );
};

export default TourCard;
