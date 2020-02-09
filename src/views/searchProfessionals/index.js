import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid } from "@material-ui/core";
import FormSearch from '../../components/searchProfesisonals/formSearch';
import CopyRight from '../../components/copyright/index';
import styles from './styles.css';

const useStyles = makeStyles(theme => (styles(theme)));

export default function SearchProfessionals() {
  console.log(useStyles());
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item sm={2} xs={4} style={{ padding: '15px' }}>
        <img src={"./img/logogray.png"} width="40"></img>
      </Grid>
      <CssBaseline />
      <main className={classes.layout}>
        <FormSearch></FormSearch>
        {/* <CopyRight /> */}
      </main>
    </React.Fragment>
  );
}
