import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../views/login/index';
import RegisterProfessional from '../views/login/registerProfessional';
import RegisterEntity from '../views/login/registerEntity';
import EntitiesTheme from '../components/themes/entities/EntitiesTheme';
import ProfessionalsTheme from '../components/themes/professionals/ProfessionalsTheme';
import RoutesEntity from "../routes/entities";
import RoutesProfessionals from "../routes/professionals";

export default () => (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/user/entity" component={() => (<EntitiesTheme><RoutesEntity></RoutesEntity></EntitiesTheme>)} />
      <Route exact path="/user/professional/profile" component={() => (<ProfessionalsTheme><RoutesProfessionals></RoutesProfessionals></ProfessionalsTheme>)} />
      <Route exact path="/register/entity" component={RegisterEntity} />
      <Route exact path="/register/professional" component={RegisterProfessional} />
    </Switch>
);