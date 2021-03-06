'use strict';

import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import Layout from './views/layout.jsx';
import Form from './views/form.jsx';
import Error404 from './views/404.jsx';

module.exports = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Form} />
      <Redirect from='/gohome' to='/' />
      <Route path='*' component={Error404} />
    </Route>
  </Router>
);