import React from 'react';

import TourCard from '../tour-card/TourCard.component';

import './FeaturedTours.styles.scss';

class FeaturedTours extends React.Component {
  renderTourItem = ({ key, ...rest }) => (
    <div className="featured-tours__tour-list-item" key={key}>
      <TourCard {...rest} />
    </div>
  );

  render() {
    return (
      <section className="featured-tours">
        <div className="featured-tours__heading-wrapper u-mb-md">
          <h2 className="featured-tours__heading heading-2 heading-2--primary">
            Most Popular Tours
          </h2>
        </div>

        <div className="featured-tours__tour-list">
          {[1, 2, 3].map((el, idx) =>
            this.renderTourItem({ id: el, rating: 4.6, key: idx })
          )}
        </div>
      </section>
    );
  }
}

export default FeaturedTours;
