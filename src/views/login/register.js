import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAreas, getProfessionsByArea } from '../../factory/areas';
import Chip from '@material-ui/core/Chip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import './register.css';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

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
  const classes = useStyles();

  const [areas, setAreas] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [values, setValues] = useState({
    area: null,
    profession: null
  });
  const [chips, setChips] = useState([]);
  const chipsSelected = useRef(null);

  const [sendObject, setSendObject] = useState({

  });


  const eventual = (e) => event => {
    let filtersChips = chips.filter(x => x.id !== e.id);
    console.log(filtersChips)
    setChips(filtersChips);
    
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

  // console.log({ values, professions });
  console.log(chips)

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

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear nueva cuenta
        </Typography>
        <form className={classes.form} style={{ paddingTop: '30px' }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombres"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellidos"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="fixed-tags-demo"
                options={[]}
                // getOptionLabel={option => option.title}
                value={null}
                onChange={(event, newValue) => {
                  // setValue(newValue);
                }}
                style={{ width: '100%' }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Regiones"
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
                options={[]}
                // getOptionLabel={option => option.title}
                value={null}
                onChange={(event, newValue) => {
                  // setValue(newValue);
                }}
                style={{ width: '100%' }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Provincias"
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
                options={[]}
                // getOptionLabel={option => option.title}
                value={null}
                onChange={(event, newValue) => {
                  // setValue(newValue);
                }}
                style={{ width: '100%' }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Comunas"
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
              {/* <Autocomplete
                multiple
                id="fixed-tags-demo"
                options={professions}
                disableCloseOnSelect
                getOptionLabel={option => option.title}
                renderOption={(option, { selected }) => {
                  if(selected) {
                    console.log(option);
                  }
                  return (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8, border: '5px solid red' }}
                        checked={selected}
                      />
                      {option.title}
                    </React.Fragment>
                  )
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
              /> */}


              <Autocomplete
                id="fixed-tags-demo"
                options={professions}
                getOptionLabel={option => option.title}
                value={values.profession}
                onChange={(event, newValue) => {
                  setValues({ ...values, profession: newValue })
                  setChips([...chips, newValue]);
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
                  <div className="remove-chipp" onClick={eventual(e)}>x</div>
                </div>
              ))}

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            ref={chipsSelected}
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
  );
}