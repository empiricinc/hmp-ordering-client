import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Configure routes
import Home from './containers/Home';
import About from './containers/About';
import PageNotFound from './containers/PageNotFound';

export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/about" component={About}/>
    <Route component={PageNotFound} />
  </Switch>
);