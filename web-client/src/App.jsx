import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.component';
import ToursPage from './pages/ToursPage.component';

import './App.scss';

const App = () => {
  return (
    <div className="ntrs-app">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/tours" component={ToursPage} />
      </Switch>
    </div>
  );
};

export default App;
