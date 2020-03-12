import React from 'react';

import ReviewContainer from '../review-stars-container/ReviewContainer.component';
import './TourSearchSidebar.styles.scss';
import UIButton from '../core-ui/button/UIButton';

const TourSearchSidebar = () => {
  return (
    <aside className="tours-search-sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar__container sidebar__container--1">
          <h4 className="sidebar__heading sidebar__heading--1">
            Top Destinations
          </h4>
          <p className="sidebar__item">The city wonderer</p>
          <p className="sidebar__item">The wine taster</p>
          <p className="sidebar__item">The Forest hiker</p>
        </div>
        <div className="sidebar__container sidebar__container--2">
          <h4 className="sidebar__heading sidebar__heading--2">
            Most reviewed tours
          </h4>
          <p className="sidebar__item">The city wonderer</p>
          <p className="sidebar__item">The wine taster</p>
          <p className="sidebar__item">The Forest hiker</p>
        </div>
        <div className="sidebar__container sidebar__container--3">
          <h4 className="sidebar__heading sidebar__heading--3">
            Apply Filters
          </h4>
          <div className="sidebar__filter-box">
            <p className="sidebar__filter-title">By average user rating</p>
            <div className="sidebar__filter-by-rating">
              {[4.5, 4, 3.5, 3].map((current, idx) => {
                return <ReviewContainer key={idx} size="md" rating={current} />;
              })}
            </div>
          </div>
          <div className="sidebar__filter-box">
            <label htmlFor="filter-price" className="sidebar__filter-title">
              By price
            </label>
            <input id="filter-price" type="range" min={299} max={4000} />
          </div>
          <div className="sidebar__filter-box">
            <label htmlFor="filter-duration" className="sidebar__filter-title">
              By duration
            </label>
            <input id="filter-duration" type="range" min={3} max={30} />
          </div>
          <div className="sidebar__filter-btns">
            <UIButton modifier="filter">Apply</UIButton>
            <UIButton modifier="filter">Clear</UIButton>
          </div>
        </div>
      </div>
      <div className="sidebar-separator"></div>
    </aside>
  );
};

export default TourSearchSidebar;
