import React from 'react';
import { IndexRoute, Route } from 'react-router';

import RootConnected from './containers/root';
import HomeView from './containers/home-view';
import AddExpense from './containers/addExpense';
import Activity from './containers/activity';
import Solde from './containers/solde';
import Payment from './containers/payment';

import crudRoutes from './crud-routes/';

import LoginContainer from './containers/login';

const routes = (
  <Route>
    <Route path="/" component={RootConnected}>
      <IndexRoute component={HomeView} />
      <Route path="/addExpense" component={AddExpense} />
      <Route path="/activity" component={Activity} />
      <Route path="/payment" component={Payment} />
      <Route path="/solde" component={Solde} />
      {crudRoutes.map(route => route)}
    </Route>
    <Route path="/login" component={LoginContainer} />
  </Route>
);

export default routes;
