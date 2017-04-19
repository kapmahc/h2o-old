import React from 'react';
import { Route } from 'react-router'

import {SignIn, SignUp} from './users'

export default {
  dashboard: <div key="auth.dashboard"/>,
  routes: [
    (<Route key="auth.non-sign-in" path="/users">
      <Route path="sign-in" component={SignIn}/>
      <Route path="sign-up" component={SignUp}/>
    </Route>)
  ],
}
