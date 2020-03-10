import React from 'react';

import TourCard from '../tour-card/TourCard.component';

import './ToursContainer.styles.scss';

const TourContainer = () => {
  return (
    <section className="section-tours">
      <div className="section-tours__head">Head</div>

      <div className="section-tours__body">
        <div className="tour-container">
          {new Array(10).fill(1).map(card => (
            <div className="tour-container__card">
              <TourCard rating={3.5} size="md" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourContainer;
