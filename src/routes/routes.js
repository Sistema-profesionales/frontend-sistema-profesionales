import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import ListProfessionals from '../views/listProfessionals/index';
import SearchProfessionals from '../views/professionals/index';
import Login from '../views/login/index';
import Register from '../views/login/register';

export default () => (
    <Switch>
      <Route exact path="/professionals" component={SearchProfessionals} />
      {/* <Route exact path="/listProfessionals" component={ListProfessionals} /> */}
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );