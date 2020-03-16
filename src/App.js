import React from "react";
import Routes from "../src/routes/routes";
import RoutesEntity from "./routes/entities";
import RoutesProfessionals from "./routes/professionals";
import DefaultTheme from "./components/themes/default/DefaultTheme";
import EntityTheme from "./components/themes/entities/EntitiesTheme";
import ProfessionalTheme from "./components/themes/professionals/ProfessionalsTheme";

function App() {
  let userLogged = JSON.parse(sessionStorage.getItem("userLogged"));
  console.log(userLogged);

  if (userLogged) {
    if (userLogged.entityId) {
      return (
        <EntityTheme>
          <RoutesEntity></RoutesEntity>
        </EntityTheme>
      );
    }

    if (!userLogged.entityId) {
      return (
        <ProfessionalTheme>
          <RoutesProfessionals></RoutesProfessionals>
        </ProfessionalTheme>
      );
    }
  } else {
    return (
      <DefaultTheme style={{ background: "red" }}>
        <Routes></Routes>
      </DefaultTheme>
    );
  }
}

export default App;
