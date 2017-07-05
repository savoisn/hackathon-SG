import React from 'react';
import { IndexRoute, Route } from 'react-router';

import RootConnected from './containers/root';
import HomeView from './containers/home-view';

import crudRoutes from './crud-routes/';

import LoginContainer from './containers/login';

const routes = (
  <Route>
    <Route path="/" component={RootConnected}>
      <IndexRoute component={HomeView} />
      {crudRoutes.map(route => route)}
    </Route>
    <Route path="/login" component={LoginContainer} />
  </Route>
);

export default routes;
