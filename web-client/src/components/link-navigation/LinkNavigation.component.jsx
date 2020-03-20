import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './LinkNavigation.styles.scss';

const LinkNavigation = props => {
  console.log(props);
  return (
    <div className="link-navigation-wrapper">
      <div className="link-navigation">
        <Link
          className="ntrs-link ntrs-link--nav-link link-navigation__link"
          to="/"
        >
          home
        </Link>
        <div className="link-navigation__separator">&#10095;</div>
        <Link
          className="ntrs-link ntrs-link--nav-link link-navigation__link"
          to="/tours"
        >
          Tours
        </Link>
        <div className="link-navigation__separator">&#10095;</div>
        <Link
          className="ntrs-link ntrs-link--nav-link link-navigation__link link-navigation__link--current"
          to="/tours/the-forest-hiker"
        >
          <strong>The Forest Hiker</strong>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(LinkNavigation);
