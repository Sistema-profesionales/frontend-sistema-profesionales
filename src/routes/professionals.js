import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserProfessional from '../views/professionals/index';
import UserProfessionalProfile from '../views/professionals/profile';
import UserProfessionalDocuments from '../views/professionals/documents';
import UserProfessionalCalendar from '../views/professionals/calendar';

export default () => (
    <Switch>
      <Route exact path="/user/professional" component={() => <UserProfessional />} />
      <Route exact path="/user/professional/profile" component={() => <UserProfessionalProfile />} />
      <Route exact path="/user/professional/documents" component={() => <UserProfessionalDocuments />} />
      <Route exact path="/user/professional/calendar" component={() => <UserProfessionalCalendar />} />
    </Switch>
  );