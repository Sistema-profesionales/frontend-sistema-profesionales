import React from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItems from '../../components/listProfessionals/listItems';

export default function AlignItemsList() {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={4}>
          <Typography component="legend">EDUCACIÓN</Typography>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Typography component="legend" style={{ textAlign: "right" }}>
            { new Date().toDateString() }
          </Typography>
        </Grid>
        <ListItems></ListItems>
      </Grid>
    </React.Fragment>
  );
}
