import React from 'react';

import SvgIconSelector from '../svg-icon-selector/SvgIconSelector.component';

const FeatureCard = ({ size, title, icName, text }) => {
  return (
    <div className={`ntrs-feature-card ${size ? `feature-card--${size}` : ''}`}>
      <div className="ntrs-feature-card__heading-wrapper">
        <SvgIconSelector
          cls={`ntrs-feature-card__icon ntrs-feature-card__icon--${icName}`}
          icName={icName}
        />
        <h3 className="heading-3 ntrs-feature-card__heading">{title}</h3>
      </div>

      <p className="ntrs-feature-card__para">{text}</p>
    </div>
  );
};

export default FeatureCard;
