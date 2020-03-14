import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import styles from "../default/defaultStyles.css";
import { BrowserRouter } from "react-router-dom";
import AppBar from "./AppBar";
const useStyles = makeStyles(theme => styles(theme));

export default function EntitiesTheme(props) {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <React.Fragment>
        <AppBar></AppBar>
        <CssBaseline />
        <main className={classes.layout}>
          {props.children}
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}
