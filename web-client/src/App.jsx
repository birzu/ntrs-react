import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UIGrid from './components/core-ui/grid/UIGrid';
import HomePage from './pages/HomePage.component';
import ToursPage from './pages/ToursPage.component';

const App = () => {
  return (
    <UIGrid>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/tours" component={ToursPage} />
      </Switch>
    </UIGrid>
  );
};

export default App;
