import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchProfessionals from '../views/entities/index';

export default () => (
    <Switch>
      <Route exact path="/user/entity" component={SearchProfessionals} />
      <Route exact path="/" render={() => <Redirect to="/user/entity" />} />
    </Switch>
  );