import React from "react";
import Routes from '../src/routes/routes';
import RoutesProfessionals from '../src/routes/professionals';
import DefaultTheme from './components/themes/default/default';
import ProfessionalTheme from './components/themes/professionals/professionals';

function App() {

  console.log(window.location);

  if(window.location.pathname != '/') {
    return (
      <ProfessionalTheme>
        <RoutesProfessionals></RoutesProfessionals>
      </ProfessionalTheme>
    );
  } else {
    return (
      <DefaultTheme>
        <Routes></Routes>
      </DefaultTheme>
    );
  }


}

export default App;
