import React, { Fragment, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import UIGrid from './components/core-ui/grid/UIGrid';
import HomePage from './pages/HomePage.component';
import Modal from './components/modal/Modal.component';

const TourDetailsPage = lazy(() => import('./pages/TourDetailsPage.component'));
const ToursPage = lazy(() => import('./pages/ToursPage.component'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage.component'));

const App = () => {
  return (
    <Fragment>
      <UIGrid>
        <Suspense fallback={<div>Loading....</div>}>
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
        </Suspense>
      </UIGrid>
      <Modal />
    </Fragment>
  );
};

export default App;
