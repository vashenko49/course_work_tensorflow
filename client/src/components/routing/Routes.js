import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFound from '../NotFound/NotFound';
import PrivateRoute from './PrivateRoute';
import Analysis from '../Analysis/Analysis';
import TestNeuron from '../TestNeuron/TestNeuron';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute exact path="/analysis" component={Analysis} />
        <PrivateRoute exact path="/test" component={TestNeuron} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
