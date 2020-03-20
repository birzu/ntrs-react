import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UIGrid from './components/core-ui/grid/UIGrid';
import HomePage from './pages/HomePage.component';
import TourDetailsPage from './pages/TourDetailsPage.component';
import ToursPage from './pages/ToursPage.component';
import UserProfilePage from './pages/UserProfilePage.component';

const App = () => {
  return (
    <UIGrid>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/tours" component={ToursPage} />
        <Route path="/tours/:tourId" component={TourDetailsPage} />
        <Route exact path="/me/user-profile" component={UserProfilePage} />
        {
          // fallback route for 404
        }
        <Route
          path="*"
          render={({ location }) => (
            <div
              style={{
                fontSize: '3rem',
                color: '#777',
                gridColumn: 'lpad-start / rpad-end'
              }}
            >{`${location.pathname} not found`}</div>
          )}
        />
      </Switch>
    </UIGrid>
  );
};

export default App;
