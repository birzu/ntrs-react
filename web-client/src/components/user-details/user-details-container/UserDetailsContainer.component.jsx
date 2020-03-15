import React from 'react';
import { Link } from 'react-router-dom';

import SvgIconSelector from '../../svg-icon-selector/SvgIconSelector.component';

const UserDetailsContainer = () => {
  return (
    <section className="section-user-details">
      <aside className="section-user-details__side">
        <ul className="section-user-details__nav-list">
          <li className="section-user-details__nav-list-item">
            <SvgIconSelector />
            <Link className="section-user-details__nav-link">Edit Profile</Link>
          </li>
          <li className="section-user-details__nav-list-item">
            <SvgIconSelector />
            <Link className="section-user-details__nav-link">Edit Profile</Link>
          </li>
          <li className="section-user-details__nav-list-item">
            <SvgIconSelector />
            <Link className="section-user-details__nav-link">Edit Profile</Link>
          </li>
        </ul>
      </aside>
    </section>
  );
};

export default UserDetailsContainer;
