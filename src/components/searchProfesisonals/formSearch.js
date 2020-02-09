import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import DateFnsUtils from "@date-io/date-fns";
import { MenuItem, Grid, TextField, Button } from "@material-ui/core";
import styles from "./styles.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { Redirect, BrowserRouter } from 'react-router-dom';
import ListProfessionals from '../../views/listProfessionals/index';

const useStyles = makeStyles(theme => styles(theme));

export default function ComplexGrid() {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);

  const [selectedDate, setSelectedDate] = React.useState(
    `${new Date()
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("-")}`
  );

  const handleDateChange = date => {
    setSelectedDate(
      date
        .toISOString()
        .replace(/T.*/, "")
        .split("-")
        .reverse()
        .join("-")
    );
  };

  const handleSearch = () => {
    setRedirect(true);
  }

  console.log(redirect);

  if(redirect) return <ListProfessionals></ListProfessionals>

  return (
    <Paper
      className={classes.paper}
      style={{
        paddingTop: "60px",
        paddingBottom: "100px",
        background: "#FAFAFA",
        boxShadow: "none"
      }}
    >
      <Typography
        component="h2"
        variant="h6"
        align="center"
        style={{ marginBottom: "45px" }}
      >
        Encontrar profesionales disponibles
      </Typography>
      <React.Fragment>
        <Grid container spacing={2} style={{ flexGrow: 1 }}>
          <Grid item sm={2} xs={4}>
            <TextField
              select
              name="profesiones"
              label="Profesiones"
              value={"0"}
            >
              <MenuItem key={"0"} value={"0"}>
                Educación
              </MenuItem>
              <MenuItem key={"1"} value={"1"}>
                Salud
              </MenuItem>
              <MenuItem key={"2"} value={"2"}>
                Nutrición
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item sm={7} xs={8}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  style={{ marginTop: 0 }}
                  margin="normal"
                  id="date-picker-dialog"
                  label="Seleccionar una fecha"
                  format="dd-MM-yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item md={2} xs={5}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              style={{ marginTop: "15px" }}
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </Paper>
  );
}
