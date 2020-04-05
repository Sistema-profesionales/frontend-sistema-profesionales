import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchProfessionals from '../views/entities/index';
import Login from '../views/login/index';

export default () => (
    <Switch>
      <Route exact path="/user/entity" component={SearchProfessionals} />
      {/* <Route exact path="/listProfessionals" component={ListProfessionals} /> */}
      <Route exact path="/" component={Login} />
    </Switch>
  );