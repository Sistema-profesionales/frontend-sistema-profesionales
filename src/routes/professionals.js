import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserProfessional from '../views/professionals/index';
import UserProfessionalProfile from '../views/professionals/profile';
import UserProfessionalDocuments from '../views/professionals/documents';
import UserProfessionalCalendar from '../views/professionals/disponibilities';

export default () => (
    <Switch>
      <Route exact path="/user/professional" component={() => <UserProfessional />} />
      <Route exact path="/user/professional/profile" component={() => <UserProfessionalProfile />} />
      <Route exact path="/user/professional/documents" component={() => <UserProfessionalDocuments />} />
      <Route exact path="/user/professional/disponibilities" component={() => <UserProfessionalCalendar />} />
      <Route exact path="/" render={() => <Redirect to="/user/professional" />} />
    </Switch>
  );