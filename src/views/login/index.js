/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
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

// const useStyles = makeStyles(theme => ({
//   paper: {
//     // marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

export default function SignUp() {
  const container = useRef(null);

  const frontSignUp = () => {
  	container.current.classList.add("right-panel-active");
  }

  const frontSignIn = () => {
    container.current.classList.remove("right-panel-active")

    window.scroll({
      left: 0,
      behavior: 'smooth'
    });

  }

  const movToRight = () => {
    window.scroll({
      left: 9000,
      behavior: 'smooth'
    });
  }

  const movToLeft = () => {
    window.scroll({
      left: 0,
      behavior: 'smooth'
    });
  }

  const data = {
    "login": "camilo",
    "pass": "1234",
    "entityId": 1
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
    <div>

      <img className="fondo-capas" id="capa-uno" src={"img/background-login/capa-uno.png"}/>
      <img className="fondo-capas" id="capa-dos" src={"img/background-login/capa-dos.png"}/>
      <img className="fondo-capas" id="capa-tres" src={"img/background-login/capa-tres.png"}/>
      <img className="fondo-capas" id="capa-cuatro" src={"img/background-login/capa-cuatro.png"}/>


      <div className="cont-body">
        <div className="cont-login">

          <Container component="main" maxWidth="xl">
            <div className="container" ref={container} >
              <div className="form-container sign-up-container">
                        
                <form action="#" style={{boder:'3px solid red'}}>

                    <h1>Perfil profesional</h1>           
                    <p>Registrese para definir sus días libres y aumentar sus horas laborales.</p>
                    <Link to="/register"><button>Registrar</button></Link>

                    <div onClick={movToLeft} className="only-mov"> Empresa?</div>
                    <p onClick={frontSignIn} className="goLogin">← Ya tengo cuenta.</p>
        
                </form>
                
              </div>
              <div className="form-container sign-in-container">
                <form action="#"><br></br>
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
                  <button onClick={handleLogin}>Continuar</button>

                  <p onClick={movToRight} className="only-mov" >No tengo cuenta → </p>
                </form>
              </div>
              
              <div className="overlay-container">
                  <div className="overlay">
                  <div className="overlay-panel overlay-left">


                    <h1>Cuenta empresa</h1>
                    <p>Encuentre a profesionales con disponibilidad inmediata.</p>
                    <button className="ghost" id="signIn">Registrar</button>


                    <p onClick={movToRight} className="only-mov">Profesional?</p>
                    <p onClick={frontSignIn} className="goLogin only-mov">← Ya tengo cuenta.</p>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>¿Nuevo por acá?</h1>
                    <p>Registre su perfil y aumente sus ingresos.</p>
                    <button className="ghost" id="signUp" 
                    onClick={frontSignUp}
                    >Registrar</button>


                    <p onClick={movToLeft} className="only-mov">← Ya tengo cuenta. ♥</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    
    </div>
  );
}