import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserProfessional from '../views/professionals/index';

export default () => (
    <Switch>
      <Route exact path="/user/professional" component={UserProfessional} />
      {/* <Route exact path="/listProfessionals" component={ListProfessionals} /> */}
      {/* <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} /> */}
    </Switch>
  );