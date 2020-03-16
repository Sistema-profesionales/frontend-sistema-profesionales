import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchProfessionals from '../views/entities/index';

export default () => (
    <Switch>
      <Route exact path="/user/entity" component={SearchProfessionals} />
      {/* <Route exact path="/listProfessionals" component={ListProfessionals} /> */}
      {/* <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} /> */}
    </Switch>
  );