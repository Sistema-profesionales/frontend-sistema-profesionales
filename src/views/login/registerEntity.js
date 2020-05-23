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
import { createUserProfessional } from '../../factory/users';
import { getAllEntities } from '../../factory/entities';
import { AppContextRegister } from '../../context/AppContextRegister';
import Alert from '../../components/globals/Alert';
import Location from '../../components/globals/Location';
import ProgressBackDrop from '../../components/globals/ProgressBackDrop';
import './register.css';
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

export default function RegisterEntity() {
  let history = useHistory();
  const classes = useStyles();
  const [showProgressBackDrop, setShowProgressBackDrop] = React.useState(false);
  const [entities, setEntities] = useState([]);
  const [values, setValues] = useState({
    area: null,
    profession: null,
    region: null,
    provincie: null,
    commune: null,
    entity: null
  });

  const [alert, setAlert] = useState(undefined);
  const chipsSelected = useRef(null);

  const [sendObject, setSendObject] = useState({
    rut: null,
    names: null,
    lastNames: null,
    communeId: null,
    entityId: null,
    login: null,
    password: null,
    phone: null,
    email: null,
  });

  const handleChangeInputText = (event) => {
    const { name, value } = event.target;
    setSendObject({ ...sendObject, [name]: value });
  }

  useEffect(() => {
    async function regions() {
      try {
        await getEntities();
      } catch (error) {
        console.log(error);
      }
    }
    regions();

  }, []);

  const getEntities = async () => {
    try {
      let entities = await getAllEntities();
      for (let i = 0; i < entities.length; i++) {
        entities[i]["title"] = entities[i].name;
      }

      setEntities(entities);
    } catch (error) {
      console.log(error);
    }
  }

  const saveUser = async () => {
    setShowProgressBackDrop(true);
    try {
      let newUserProfessional = await createUserProfessional(sendObject);
      if(newUserProfessional) {
        setTimeout(() => {
          history.push("/");
          setShowProgressBackDrop(false);
        }, 3000);
      }
    } catch (error) {
      // console.log(error.message);
      setShowProgressBackDrop(false);
      setAlert({
        variant: 'filled',
        severity: 'error',
        message: error.message
      });
    }
  }

  return (
    <AppContextRegister.Provider value={{
      alert,
      setAlert,
      sendObject, 
      setSendObject,
      setShowProgressBackDrop,
      showProgressBackDrop
    }}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Regístrese como empresa
        </Typography>
          <form className={classes.form} style={{ paddingTop: '30px' }} noValidate>
          {showProgressBackDrop ? <ProgressBackDrop context={AppContextRegister} text={"Validando y guardando su informacion"}></ProgressBackDrop> : null}
          {alert && <Alert {...alert} context={AppContextRegister}></Alert>}
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
                  name="lastNames"
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
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  onChange={handleChangeInputText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Confirmar contraseña"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="current-password"
                  onChange={handleChangeInputText}
                />
              </Grid>

              <Location context={AppContextRegister} />
              
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  // disabled={values.commune ? false : true}
                  id="auto-entities"
                  options={entities}
                  getOptionLabel={option => option.title}
                  value={values.entity}
                  onChange={(event, newValue) => {
                    setValues({ ...values, entity: newValue });
                    if (newValue) setSendObject({ ...sendObject, entityId: newValue.id });
                  }}
                  style={{ width: '100%' }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Entidades"
                      variant="outlined"
                      placeholder="Buscar"
                      fullWidth
                    />
                  )}
                />
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
    </AppContextRegister.Provider>
  );
}