import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAreas, getProfessionsByArea } from '../../factory/areas';
import { getRegions, getProvinciesByRegion } from '../../factory/regions';
import { getCommunesByProvince } from '../../factory/provincies';
import { createUserProfessional } from '../../factory/users';
import './register.css';
import Alert from '../../components/globals/Alert';
import { AppContextRegisterProfessional } from '../../context/AppContextRegisterProfessional';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  let history = useHistory();
  const classes = useStyles();
  const [areas, setAreas] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [regions, setRegions] = useState([]);
  const [provincies, setProvincies] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [values, setValues] = useState({
    area: null,
    profession: null,
    region: null,
    provincie: null,
    commune: null
  });
  const [chips, setChips] = useState([]);
  const chipsSelected = useRef(null);

  const [sendObject, setSendObject] = useState({
    rut: null,
    names: null,
    lastnames: null,
    communeId: null,
    login: null,
    password: null,
    phone: null,
    email: null,
    professions: []
  });

  const [alert, setAlert] = useState(undefined);

  const createChipsProfessions = (e) => event => {
    let filtersChips = chips.filter(x => x.id !== e.id);
    setChips(filtersChips);
    setSendObject({ ...sendObject, professions: filtersChips });
  }

  const handleChangeInputText = (event) => {
    const { name, value } = event.target;
    setSendObject({ ...sendObject, [name]: value });
  }

  useEffect(() => {
    async function areas() {
      try {
        let areas = await getAreas();

        for (let i = 0; i < areas.length; i++) {
          areas[i]["title"] = areas[i].name;
        }

        setAreas(areas);
      } catch (error) {
        console.log(error);
      }
    }
    areas();

  }, []);


  useEffect(() => {
    async function regions() {
      try {
        let regions = await getRegions();

        for (let i = 0; i < regions.length; i++) {
          regions[i]["title"] = regions[i].name;
        }

        setRegions(regions);
      } catch (error) {
        console.log(error);
      }
    }
    regions();

  }, []);

  const getProffesionsArea = async (areaId) => {
    try {
      let professions = await getProfessionsByArea(areaId);
      for (let i = 0; i < professions.length; i++) {
        professions[i]["title"] = professions[i].name;
      }

      setProfessions(professions);
    } catch (error) {
      console.log(error);
    }
  }

  const getProvincesRegion = async (regionId) => {
    try {
      let provincies = await getProvinciesByRegion(regionId);
      for (let i = 0; i < provincies.length; i++) {
        provincies[i]["title"] = provincies[i].name;
      }

      setProvincies(provincies);
    } catch (error) {
      console.log(error);
    }
  }


  const getCommunesProvince = async (provinceId) => {
    try {
      let communes = await getCommunesByProvince(provinceId);
      for (let i = 0; i < communes.length; i++) {
        communes[i]["title"] = communes[i].name;
      }

      setCommunes(communes);
    } catch (error) {
      console.log(error);
    }
  }

  const saveUser = async () => {
    try {
      let newUserProfessional = await createUserProfessional(sendObject);
      //console.log(newUserProfessional);
      if(newUserProfessional) {
        setAlert({
          variant: 'filled',
          severity: 'success',
          message: "Te has registrado con éxito, serás redirigido para iniciar sesión",
          loading: true
        });

        setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
      setAlert({
        variant: 'filled',
        severity: 'error',
        message: error.message
      });
    }
  }

  return (
    <AppContextRegisterProfessional.Provider value={{
      alert,
      setAlert
    }}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear cuenta profesional
        </Typography>
          <form className={classes.form} style={{ paddingTop: '30px' }} noValidate>
            <Alert {...alert} context={AppContextRegisterProfessional}></Alert>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="fname"
                  name="rut"
                  variant="outlined"
                  required
                  fullWidth
                  id="rut"
                  label="RUT"
                  autoFocus
                  onChange={handleChangeInputText}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="fname"
                  name="names"
                  variant="outlined"
                  required
                  fullWidth
                  id="names"
                  label="Nombres"
                  onChange={handleChangeInputText}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastNames"
                  label="Apellidos"
                  name="lastnames"
                  autoComplete="lname"
                  onChange={handleChangeInputText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Telefono"
                  name="phone"
                  autoComplete="phone"
                  onChange={handleChangeInputText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Correo electronico"
                  name="email"
                  autoComplete="email"
                  onChange={handleChangeInputText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="login"
                  label="Login"
                  type="text"
                  id="login"
                  onChange={handleChangeInputText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChangeInputText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  id="fixed-tags-demo"
                  options={regions}
                  getOptionLabel={option => option.title}
                  value={values.region}
                  onChange={(event, newValue) => {
                    setValues({ ...values, region: newValue });
                    if (newValue) getProvincesRegion(newValue.id);
                    else setProvincies([]);
                  }}
                  style={{ width: '100%' }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Región"
                      variant="outlined"
                      placeholder="Buscar"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  id="fixed-tags-demo"
                  options={provincies}
                  getOptionLabel={option => option.title}
                  value={values.provincie}
                  onChange={(event, newValue) => {
                    setValues({ ...values, provincie: newValue });
                    if (newValue) getCommunesProvince(newValue.id);
                  }}
                  style={{ width: '100%' }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Provincia"
                      variant="outlined"
                      placeholder="Buscar"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id="fixed-tags-demo"
                  options={communes}
                  getOptionLabel={option => option.title}
                  value={values.commune}
                  onChange={(event, newValue) => {
                    setValues({ ...values, commune: newValue });
                    if (newValue) setSendObject({ ...sendObject, communeId: newValue.id });
                  }}
                  noOptionsText={false}
                  style={{ width: '100%' }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Comuna"
                      variant="outlined"
                      placeholder="Buscar"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  id="auto-areas"
                  options={areas}
                  getOptionLabel={option => option.title}
                  value={values.area}
                  onChange={(event, newValue) => {
                    setValues({ ...values, area: newValue });
                    if (newValue) getProffesionsArea(newValue.id);
                    else setProfessions([]);
                  }}
                  style={{ width: '100%' }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Areas"
                      variant="outlined"
                      placeholder="Buscar"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  id="fixed-tags-demo"
                  options={professions}
                  getOptionLabel={option => option.title}
                  value={values.profession}
                  onChange={(event, newValue) => {
                    setValues({ ...values, profession: newValue })
                    setChips([...chips, newValue]);
                    setSendObject({ ...sendObject, professions: [...sendObject.professions, newValue] });
                    chipsSelected.current.focus();
                  }}
                  style={{ width: '100%' }}
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

              <Grid item xs={12}>
                {chips.length > 0 && chips.map((e, i) => e && (
                  <div key={i} className="chipp">
                    <div className="text-chipp">{e.name}</div>
                    <div className="remove-chipp" onClick={createChipsProfessions(e)}>x</div>
                  </div>
                ))}

              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              ref={chipsSelected}
              onClick={saveUser}
            >
              Registrarse
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Volver al inicio de sesion
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          {/* <Copyright /> */}
        </Box>
      </Container>
    </AppContextRegisterProfessional.Provider>
  );
}