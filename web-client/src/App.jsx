import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.component';

import './App.scss';

const App = () => {
  return (
    <div className="ntrs-app">
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;
