import React from "react";
import Routes from "../src/routes/routes";
import RoutesEntity from "./routes/entities";
import RoutesProfessionals from "./routes/professionals";
import DefaultTheme from "./components/themes/default/DefaultTheme";
import EntityTheme from "./components/themes/entities/EntitiesTheme";
import ProfessionalTheme from "./components/themes/professionals/ProfessionalsTheme";

function App() {
  console.log(window.location.pathname);
  if (window.location.pathname !== "/" && window.location.pathname !== "/register/professional" && window.location.pathname !== "/register/entity") {
    if (window.location.pathname.includes("/user/entity")) {
      console.log("entity");
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
      <DefaultTheme style={{ background: "red" }}>
        <Routes></Routes>
      </DefaultTheme>
    );
  }
}

export default App;
