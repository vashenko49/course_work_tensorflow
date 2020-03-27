import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFound from '../NotFound/NotFound';
import PrivateRoute from './PrivateRoute';
import Analysis from '../Analysis/Analysis';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute exact path="/analysis" component={Analysis} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
