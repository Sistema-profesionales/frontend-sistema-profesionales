import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid } from "@material-ui/core";
import styles from "./defaultStyles.css";
import { BrowserRouter } from "react-router-dom";
const useStyles = makeStyles(theme => styles(theme));

export default function SearchProfessionals(props) {
const classes = useStyles();
  return (
    <BrowserRouter>
      <React.Fragment>
        <Grid item sm={2} xs={4} style={{ padding: "15px" }}>
          <img src={"./img/logogray.png"} width="40"></img>
        </Grid>
        <CssBaseline />
        <main className={classes.layout}>
            { props.children }
          {/* <Routes></Routes> */}
          {/* <CopyRight /> */}
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}