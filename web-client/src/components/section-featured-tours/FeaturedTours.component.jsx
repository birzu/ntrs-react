import React from 'react';

import TourCard from '../tour-card/TourCard.component';

import './FeaturedTours.styles.scss';

class FeaturedTours extends React.Component {
  renderTourItem = props => (
    <div className="featured-tours__tour-list-item">
      <TourCard {...props} />
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
          {[1, 2, 3].map(el => this.renderTourItem({ id: el, rating: 4.6 }))}
        </div>
      </section>
    );
  }
}

export default FeaturedTours;
