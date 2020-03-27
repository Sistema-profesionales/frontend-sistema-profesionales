import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './register.css';
import { useHistory } from 'react-router-dom';
import Stepper from '../../components/registry/professionals/Stepper';

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

export default function RegisterProfessional() {
  let history = useHistory();
  const classes = useStyles();

  // const [sendObject, setSendObject] = useState(undefined);


  // const saveUser = async () => {
  //   try {
  //     let newUserProfessional = await createUserProfessional(sendObject);
  //     //console.log(newUserProfessional);
  //     if (newUserProfessional) {
  //       setAlert({
  //         variant: 'filled',
  //         severity: 'success',
  //         message: "Te has registrado con éxito, serás redirigido para iniciar sesión",
  //         loading: true
  //       });

  //       setTimeout(() => {
  //         history.push("/");
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     setAlert({
  //       variant: 'filled',
  //       severity: 'error',
  //       message: error.message
  //     });
  //   }
  // }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Regístrese como profesional
        </Typography>
        <form className={classes.form} style={{ paddingTop: '30px' }}>

          <Grid container spacing={2}>
            <Stepper></Stepper>
          </Grid>
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