import React from "react";
import Routes from "../src/routes/routes";
import RoutesEntity from "./routes/entities";
import RoutesProfessionals from "./routes/professionals";
import DefaultTheme from "./components/themes/default/defaultTheme";
import EntityTheme from "./components/themes/entities/entitiesTheme";
import ProfessionalTheme from "./components/themes/professionals/professionalsTheme";

function App() {
  // console.log(window.location);
  if (window.location.pathname != "/") {
    if (window.location.pathname.includes("/user/entity")) {
      return (
        <EntityTheme>
          <RoutesEntity></RoutesEntity>
        </EntityTheme>
      );
    }

    if (window.location.pathname.includes("/user/professional")) {
      return (
        <ProfessionalTheme>
          <RoutesProfessionals></RoutesProfessionals>
        </ProfessionalTheme>
      );
    }
  } else {
    return (
      <DefaultTheme>
        <Routes></Routes>
      </DefaultTheme>
    );
  }
}

export default App;
