import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import DateFnsUtils from "@date-io/date-fns";
import { Grid, TextField, Button } from "@material-ui/core";
import styles from "./styles.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { Redirect } from 'react-router-dom';
import { getProfessions } from '../../factory/professions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AppContextSearchProfessional } from '../../context/searchProfessionalsContext';

const useStyles = makeStyles(theme => styles(theme));

export default function ComplexGrid() {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);

  const [professions, setProfessions] = React.useState([]);

  const { valuesForm, setValuesForm } = useContext(AppContextSearchProfessional);

  useEffect(() => {
    async function loadProfessions() {
      try {
        const professions = await getProfessions();
        for (let i = 0; i < professions.length; i++) {
          professions[i]["title"] = professions[i]["name"];
        }
        setProfessions(professions);

      } catch (error) {
        console.log(error);
      }
    }
    loadProfessions();

  }, [])

  const [selectedDate, setSelectedDate] = React.useState(
    new Date()
  );

  const [value, setValue] = React.useState(null);

  const handleDateChange = date => {

    setSelectedDate(
      date
    );
  };

  const handleSearch = () => {
    setValuesForm({
      date: selectedDate,
      profession: value.name
    });

    console.log(valuesForm);
    // setRedirect(true);
  }

  if (redirect) return <Redirect to="/listProfessionals" />

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
          <Grid item>
            <Autocomplete
              id="fixed-tags-demo"
              options={professions}
              getOptionLabel={option => option.title}
              value={value}
              onChange={(event, newValue) => {
                
                setValue(newValue);
              }}
              style={{ width: 200 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Profesiones"
                  variant="outlined"
                  placeholder="Buscar"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  style={{ marginTop: 0 }}
                  margin="normal"
                  id="date-picker-dialog"
                  label="Seleccionar una fecha"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              style={{ marginTop: "0px", padding: '10px' }}
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
