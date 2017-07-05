import React from 'react';

import { Route } from 'react-router';

import Country from '../containers/country';

const route = (
  <Route key="country" path="country" component={Country} />
);

export default route;

