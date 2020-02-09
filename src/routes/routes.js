import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ListProfessionals from '../views/listProfessionals/index';

export default () => (
    <Switch>
      <Route exact path="/" component={ListProfessionals} />
    </Switch>
  );