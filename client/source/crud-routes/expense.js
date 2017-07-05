import React from 'react';

import { Route } from 'react-router';

import Expense from '../containers/expense';

const route = (
  <Route path="expense" component={Expense} />
);

export default route;

