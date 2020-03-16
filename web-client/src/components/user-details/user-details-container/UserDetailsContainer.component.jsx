import React from 'react';
import { Link } from 'react-router-dom';

import EditDetails from '../profile/EditDetails.component';
import EditPassword from '../profile/EditPassword.component';
import SvgIconSelector from '../../svg-icon-selector/SvgIconSelector.component';

import './UserDetailsContainer.styles.scss';

const UserDetailsContainer = () => {
  return (
    <section className="section-user-details">
      <aside className="section-user-details__side">
        <ul className="section-user-details__nav-list">
          <li className="section-user-details__nav-list-item">
            <Link className="section-user-details__nav-link section-user-details__nav-link--active">
              <SvgIconSelector
                cls="section-user-details__ic"
                icName="settings"
              />
              Edit Profile
            </Link>
            <span></span>
          </li>
          <li className="section-user-details__nav-list-item">
            <Link className="section-user-details__nav-link">
              <SvgIconSelector
                cls="section-user-details__ic"
                icName="briefcase"
              />
              My Bookings
            </Link>
            <span></span>
          </li>
          <li className="section-user-details__nav-list-item">
            <Link className="section-user-details__nav-link">
              <SvgIconSelector cls="section-user-details__ic" icName="star" />
              My Reviews
            </Link>
            <span></span>
          </li>
        </ul>
      </aside>
      <div className="section-user-details__content">
        <EditDetails />
        <EditPassword />
      </div>
    </section>
  );
};

export default UserDetailsContainer;
