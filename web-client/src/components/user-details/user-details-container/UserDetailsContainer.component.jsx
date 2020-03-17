import React, { useState, Fragment } from 'react';

import EditDetails from '../profile/EditDetails.component';
import EditPassword from '../profile/EditPassword.component';
import SvgIconSelector from '../../svg-icon-selector/SvgIconSelector.component';
import UserReviewsContainer from '../user-reviews/MyReviews.component';

import './UserDetailsContainer.styles.scss';
import UserBookingContainer from '../user-bookings/MyBookings.component';

const UserDetailsContainer = () => {
  const [currentContent, setCurrentContent] = useState('profile');

  const renderContent = () => {
    switch (currentContent) {
      case 'profile':
        return (
          <Fragment>
            <EditDetails />
            <div className="user-details__content-divider"></div>
            <EditPassword />
          </Fragment>
        );
      case 'reviews':
        return (
          <Fragment>
            <UserReviewsContainer />
          </Fragment>
        );
      case 'bookings':
        return (
          <Fragment>
            <UserBookingContainer />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <EditDetails />
            <EditPassword />
          </Fragment>
        );
    }
  };

  return (
    <section className="section-user-details">
      <div className="user-details">
        <aside className="user-details__side">
          <ul className="user-details__nav-list">
            <li className="user-details__nav-list-item">
              <p
                onClick={e => {
                  e.stopPropagation();
                  setCurrentContent('profile');
                }}
                className={`user-details__nav-link ${
                  currentContent === 'profile'
                    ? 'user-details__nav-link--active'
                    : ''
                }`}
              >
                <SvgIconSelector cls="user-details__ic" icName="settings" />
                Edit Profile
              </p>
              <span></span>
            </li>
            <li className="user-details__nav-list-item">
              <p
                onClick={e => {
                  e.stopPropagation();
                  setCurrentContent('bookings');
                }}
                className={`user-details__nav-link ${
                  currentContent === 'bookings'
                    ? 'user-details__nav-link--active'
                    : ''
                }`}
              >
                <SvgIconSelector cls="user-details__ic" icName="briefcase" />
                My Bookings
              </p>
              <span></span>
            </li>
            <li className="user-details__nav-list-item">
              <p
                onClick={e => {
                  e.stopPropagation();
                  setCurrentContent('reviews');
                }}
                className={`user-details__nav-link  ${
                  currentContent === 'reviews'
                    ? 'user-details__nav-link--active'
                    : ''
                }`}
              >
                <SvgIconSelector cls="user-details__ic" icName="star" />
                My Reviews
              </p>
              <span></span>
            </li>
          </ul>
        </aside>
        <div className="user-details__content">{renderContent()}</div>
      </div>
    </section>
  );
};

export default UserDetailsContainer;
