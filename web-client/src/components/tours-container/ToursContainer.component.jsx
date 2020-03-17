import React, { useState } from 'react';

import TourCard from '../tour-card/TourCard.component';

import './ToursContainer.styles.scss';

const TourContainer = () => {
  const sortOptions = {
    price: 'Price (low to high)',
    '-price': '	Price (High to low)',
    duration: 'Duration (low to high)',
    '-duration': 'Duration (high to low)'
  };
  const [sortOption, setSortOption] = useState(sortOptions['price']);

  return (
    <section className="section-tours">
      <div className="section-tours__head">
        <div className="section-tours__sort-box">
          <label htmlFor="select" className="section-tours__sort-box-title">
            Sort by
          </label>
          <div
            id="select"
            className="section-tours__select-wrapper"
            tabIndex="0"
          >
            <input
              type="radio"
              id="select-box"
              value={sortOptions['price']}
              name="select-box"
              className="section-tours__select"
              checked
            />
            <label htmlFor="select-box" className="section-tours__select-label">
              {sortOption}
            </label>
          </div>
          <ul className="section-tours__select-option-list">
            <li
              className="section-tours__select-option"
              onClick={() => setSortOption(sortOptions['price'])}
              aria-hidden="true"
            >
              {sortOptions['price']}
            </li>
            <li
              className="section-tours__select-option"
              onClick={() => setSortOption(sortOptions['-price'])}
            >
              {sortOptions['-price']}
            </li>
            <li
              className="section-tours__select-option"
              onClick={() => setSortOption(sortOptions['duration'])}
            >
              {sortOptions['duration']}
            </li>
            <li
              className="section-tours__select-option"
              onClick={() => setSortOption(sortOptions['-duration'])}
            >
              {sortOptions['-duration']}
            </li>
          </ul>
        </div>

        <div className="section-tours__page-box">
          <p className="section-tours__page-current"> Page 1 / 4</p>
          <div className="section-tours__btn-prev-page">
            <span></span>
          </div>
          <div className="section-tours__btn-next-page">
            <span></span>
          </div>
        </div>
      </div>

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
