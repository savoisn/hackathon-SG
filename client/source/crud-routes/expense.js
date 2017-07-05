import React from 'react';

import { Route } from 'react-router';

import Expense from '../containers/expense';

const route = (
  <Route key="expense" path="expense" component={Expense} />
);

export default route;

