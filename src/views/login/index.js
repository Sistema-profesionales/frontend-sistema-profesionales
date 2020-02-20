/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import './login.css';
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



function frontSignUp () {
  const container = document.getElementById('container');
	container.classList.add("right-panel-active");
}

function frontSignIn () {
  const container = document.getElementById('container');
	container.classList.remove("right-panel-active");
}



export default function SignUp() {
  const classes = useStyles();

  const data = {
    "login": "camilo",
    "pass": "1234",
    "entityId": null
  }

  const [isValid, setIsvalid] = useState(undefined); 

  const handleLogin = () => { 
    if(data.entityId) {
      setIsvalid(true);
      console.log(data);
    } else {
      setIsvalid(false);
    }
   }

  if(!isValid && isValid !== undefined)  window.location.href = "/user/professional";
  if(isValid && isValid !== undefined) window.location.href = "/user/entity";

  return (
    
    <div className="cont-body">
    <div className="cont-login">


    <img className="fondo-capas" id="capa-uno" src={"img/background-login/capa-uno.png"}/>
    <img className="fondo-capas" id="capa-dos" src={"img/background-login/capa-dos.png"}/>
    <img className="fondo-capas" id="capa-tres" src={"img/background-login/capa-tres.png"}/>
    <img className="fondo-capas" id="capa-cuatro" src={"img/background-login/capa-cuatro.png"}/>

      
    <Container component="main" maxWidth="xl">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
                   
          <form action="#" style={{boder:'3px solid red'}}>
            <h1>Perfil profesional</h1>           
              <p>Registrese para definir sus días libres y aumentar sus horas laborales.</p>
            <Link to="/register"><button>Registrar</button></Link>
            <p onClick={frontSignIn}>Ya tienes una cuenta? - Entrar</p>
          </form>

          
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Ingrese</h1>
            <span>sus datos para entrar al sistema</span>
            <br></br>
            <Grid style={{ width:'100%' }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Usuario o correo electronico"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <br></br>
            <Grid style={{ width:'100%' }}>
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
            <a href="#">Recuperar passss</a>
            <button>Continuar</button>
          </form>
        </div>
        
        <div className="overlay-container">
            <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Cuenta empresa</h1>
              <p>Encuentre a profesionales con disponibilidad inmediata.</p>
              <button className="ghost" id="signIn">Registrar</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>¿Nuevo por acá?</h1>
              <p>Registre su perfil y aumente sus ingresos.</p>
              <button className="ghost" id="signUp" 
              onClick={frontSignUp}
              >Registrar</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
    </div></div>
  );
}