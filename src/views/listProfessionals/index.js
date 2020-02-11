import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItems from "../../components/listProfessionals/listItems";
import { AppContext } from "../../context/ListProfessionalsContext";
import ViewDisponibility from '../../components/listProfessionals/viewDisponibility';

export default function AlignItemsList() {
  // definimos los state que deseamos modificar a través del provider
  const [openFullScreenModal, setopenFullScreenModal] = useState(false);
  const [professionalSelected, setProfessionalSelected] = useState(undefined);
  return (
    // definimos el provider
    <AppContext.Provider value={{ 
      openFullScreenModal, 
      setopenFullScreenModal, 
      professionalSelected,
      setProfessionalSelected 
      }}>
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={4}>
            <Typography component="legend">EDUCACIÓN</Typography>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Typography component="legend" style={{ textAlign: "right" }}>
              {new Date().toDateString()}
            </Typography>
          </Grid>
          <ListItems></ListItems>
          <ViewDisponibility />
        </Grid>
      </React.Fragment>
    </AppContext.Provider>
  );
}
