import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchProfessionals from '../views/professionals/index';

export default () => (
    <Switch>
      <Route exact path="/professionals" component={SearchProfessionals} />
      {/* <Route exact path="/listProfessionals" component={ListProfessionals} /> */}
      {/* <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} /> */}
    </Switch>
  );