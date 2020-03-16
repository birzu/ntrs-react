import React, { useState, Fragment } from 'react';

import EditDetails from '../profile/EditDetails.component';
import EditPassword from '../profile/EditPassword.component';
import SvgIconSelector from '../../svg-icon-selector/SvgIconSelector.component';
import UserReviewsContainer from '../user-reviews/MyReviews.component';

import './UserDetailsContainer.styles.scss';

const UserDetailsContainer = () => {
  const [currentContent, setCurrentContent] = useState('profile');

  const renderContent = () => {
    switch (currentContent) {
      case 'profile':
        return (
          <Fragment>
            <EditDetails />
            <EditPassword />
          </Fragment>
        );
      case 'reviews':
        return (
          <Fragment>
            <UserReviewsContainer />
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
      <aside className="section-user-details__side">
        <ul className="section-user-details__nav-list">
          <li className="section-user-details__nav-list-item">
            <p
              onClick={e => {
                e.stopPropagation();
                setCurrentContent('profile');
              }}
              className={`section-user-details__nav-link ${
                currentContent === 'profile'
                  ? 'section-user-details__nav-link--active'
                  : ''
              }`}
            >
              <SvgIconSelector
                cls="section-user-details__ic"
                icName="settings"
              />
              Edit Profile
            </p>
            <span></span>
          </li>
          <li className="section-user-details__nav-list-item">
            <p
              onClick={e => {
                e.stopPropagation();
                setCurrentContent('bookings');
              }}
              className={`section-user-details__nav-link ${
                currentContent === 'bookings'
                  ? 'section-user-details__nav-link--active'
                  : ''
              }`}
            >
              <SvgIconSelector
                cls="section-user-details__ic"
                icName="briefcase"
              />
              My Bookings
            </p>
            <span></span>
          </li>
          <li className="section-user-details__nav-list-item">
            <p
              onClick={e => {
                e.stopPropagation();
                setCurrentContent('reviews');
              }}
              className={`section-user-details__nav-link  ${
                currentContent === 'reviews'
                  ? 'section-user-details__nav-link--active'
                  : ''
              }`}
            >
              <SvgIconSelector cls="section-user-details__ic" icName="star" />
              My Reviews
            </p>
            <span></span>
          </li>
        </ul>
      </aside>
      <div className="section-user-details__content">{renderContent()}</div>
    </section>
  );
};

export default UserDetailsContainer;
