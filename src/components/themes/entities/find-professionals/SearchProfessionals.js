import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import styles from "../styles.css";
import { getProfessions } from '../../../../factory/professions';
import { getFindProfessionalsByFilters } from '../../../../factory/users';
import { getCommunesByProvinceAndUserId } from '../../../../factory/provincies';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AppContextEntities } from '../../../../context/AppEntitiesContext';
import ResultSearch from './ResultSearch';
import { timeSlots, daysOfWeek } from '../../../../constants/timesAndDays';

const useStyles = makeStyles(theme => styles(theme));

// EXPORT FORMSEARCH
export default function FormSearch() {
  const classes = useStyles();

  const [professions, setProfessions] = React.useState([]);
  const [communes, setCommunes] = React.useState([]);
  const [communeSelected, setCommuneSelected] = React.useState([]);
  

  const { 
    setValuesForm, 
    valuesForm, 
    userLocalStorage,  
    setShowProgressBackDrop,
    page,
    setPage,
    resultSearch, 
    setResultSearch
  } = useContext(AppContextEntities);

  useEffect(() => {
    async function loadData() {
      try {
        setShowProgressBackDrop(true);
        const professions = await getProfessions();
        for (let i = 0; i < professions.length; i++) {
          professions[i]["title"] = professions[i]["name"];
        }
        setProfessions(professions);

        const communes = await getCommunesByProvinceAndUserId(userLocalStorage.id);
        for (let i = 0; i < communes.length; i++) {
          communes[i]["title"] = communes[i]["name"];
        }
        setCommunes(communes);

        let communeSelected = communes[communes.findIndex(x => x.id === userLocalStorage.communeId)];

        setCommuneSelected([communeSelected]);

        setValuesForm({
          ...valuesForm,
          communes: [communeSelected.id]
        });


        const data = await getFindProfessionalsByFilters({ communes: [communeSelected.id] }, page);
        // console.log(data);
        setResultSearch(data);

        // handleFindProfessionals();

      } catch (error) {
        console.log(error);
      } finally {
        setShowProgressBackDrop(false);
      }
    }
    loadData();
    // eslint-disable-next-line
  }, []);

  const handleFindProfessionals = async () => {
    setPage(1);
    setResultSearch(undefined);
    try {
      if(valuesForm) {
        setShowProgressBackDrop(true);
        const data = await getFindProfessionalsByFilters(valuesForm, 1);
        setResultSearch(data);
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setShowProgressBackDrop(false);
    }
  }

  

  return (
    <Paper
      className={classes.paper}
      style={{
        paddingTop: "25px",
        paddingBottom: "100px",
        background: "#FAFAFA",
        boxShadow: "none",
        marginTop: '0px',
        backgroundColor: 'transparent !important'
      }}
    >
      <Typography
        component="h2"
        variant="h5"
        align="center"
        style={{ marginBottom: "45px", textAlign: 'left', fontWeight: 'bold' }}
      >
        Encontrar profesionales disponibles
      </Typography>
      <React.Fragment>
        <Grid container spacing={2} style={{ flexGrow: 1, marginBottom: '25px', backgroundColor: 'transparent !important' }}>
          <Grid item xs={12} sm={3} style={{ backgroundColor: 'transparent !important' }}>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={professions}
              disableCloseOnSelect
              loading
              loadingText="Cargando..."
              disablePortal
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => {
                if (newValue.length > 0) {
                  
                  setValuesForm({
                    ...valuesForm,
                    professions: newValue.map(e => e.id)
                  });

                } else {
                  setValuesForm({
                    ...valuesForm,
                    professions: []
                  });
                }
                // setTimeout(async () => {
                //   console.log(valuesForm);
                //   await handleFindProfessionals();
                // }, 2000);
              }}
              onBlur={handleFindProfessionals}
              renderTags={(value, getTagProps) => {
                const tags = value.slice(0, 1).map((option, index) => (
                  <Chip label={option.title} {...getTagProps({ index })} className={classes.tag} />
                ));
                const length = value.length;
                return (
                  <div>
                    {tags}
                    {length > 1 ? `+${length - 1}` : ''}
                  </div>
                );
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Profesiones" placeholder="Profesiones" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
          <Autocomplete
              multiple
              id="communes-id"
              options={communes}
              disableCloseOnSelect
              loading
              loadingText="Cargando..."
              disablePortal
              getOptionLabel={(option) => option.name}
              value={communeSelected}
              onChange={(event, newValue) => {
                setCommuneSelected([]);
                if (newValue.length > 0) {
                  setCommuneSelected([...newValue]);
                  setValuesForm({
                    ...valuesForm,
                    communes: newValue.map(e => e.id)
                  });
                } else {
                  setCommuneSelected([]);
                  setValuesForm({
                    ...valuesForm,
                    communes: []
                  });
                }
              }}
              onBlur={handleFindProfessionals}
              renderTags={(value, getTagProps) => {
                const tags = value.slice(0, 1).map((option, index) => (
                  <Chip label={option.name} {...getTagProps({ index })} className={classes.tag} />
                ));
                const length = value.length;

                return (
                  <div>
                    {tags}
                    {length > 1 ? `+${length - 1}` : ''}
                  </div>
                );
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Comunas" placeholder="Comunas" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Autocomplete
              multiple
              id="days"
              options={daysOfWeek}
              disableCloseOnSelect
              loading
              getOptionLabel={option => option.title}
              style={{ width: '100%' }}
              onChange={(event, newValue) => {
                if (newValue.length > 0) {
                  setValuesForm({
                    ...valuesForm,
                    daysOfWeek: newValue.map(e => e.day)
                  });
                } else {
                  setValuesForm({
                    ...valuesForm,
                    daysOfWeek: []
                  });
                }
              }}
              onBlur={handleFindProfessionals}
              renderTags={(value, getTagProps) => {
                const tags = value.slice(0, 1).map((option, index) => (
                  <Chip label={option.title} {...getTagProps({ index })} className={classes.tag} />
                ));
                const length = value.length;

                return (
                  <div>
                    {tags}
                    {length > 1 ? `+${length - 1}` : ''}
                  </div>
                );
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Para los dias"
                  variant="outlined"
                  placeholder="Buscar"
                  fullWidth
                />
              )}
            />
          </Grid>


          <Grid item xs={12} sm={2}>
            <Autocomplete
              id="startHour"
              options={timeSlots}
              loading
              style={{ width: '100%' }}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValuesForm({
                    ...valuesForm,
                    startHour: newValue
                  });
                } else {
                  setValuesForm({
                    ...valuesForm,
                    startHour: null
                  });
                }
              }}
              onBlur={handleFindProfessionals}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Desde la hora"
                  variant="outlined"
                  placeholder="Buscar"
                  fullWidth
                />
              )}
            />
          </Grid>


          <Grid item xs={12} sm={2}>
            <Autocomplete
              id="endHour"
              options={timeSlots}
              loading
              style={{ width: '100%' }}
              onBlur={handleFindProfessionals}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValuesForm({
                    ...valuesForm,
                    endHour: newValue
                  });
                } else {
                  setValuesForm({
                    ...valuesForm,
                    endHour: null
                  });
                }
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Hasta la hora"
                  variant="outlined"
                  placeholder="Buscar"
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              style={{ marginTop: "0px", padding: '10px', width: '100%' }}
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              
            >
              Buscar
            </Button>
          </Grid> */}
        </Grid>
        <ResultSearch data={resultSearch}></ResultSearch>
      </React.Fragment>
    </Paper>
  );
}