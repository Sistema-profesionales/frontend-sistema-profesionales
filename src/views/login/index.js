/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginUser } from '../../factory/users';
import './login.css';

export default function SignUp() {
  const container = useRef(null);
  const [userAccess, setUserAccess] = React.useState({
    login: null,
    password: null
  });

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

  const handleForm = (event) => {
    const { name, value } = event.target;

    setUserAccess({ ...userAccess, [name]: value });
  }

  const handleLogin = async () => { 
    try {
      let queryUser = await loginUser(userAccess);
      if(queryUser.entityId) {
        window.location.href = "/user/entity";
      } else {
        window.location.href = "/user/professional";
      }
    } catch (error) {
      console.log(error);
    }
    
   }

  // if(isProfessional && isProfessional !== undefined)  window.location.href = "/user/professional";
  // if(!isProfessional && isProfessional !== undefined) window.location.href = "/user/entity";

  return (
    <div>

      <img className="fondo-capas" id="capa-uno" src={"img/background-login/capa-uno.png"} alt="capa uno" />
      <img className="fondo-capas" id="capa-dos" src={"img/background-login/capa-dos.png"} alt="capa dos" />
      <img className="fondo-capas" id="capa-tres" src={"img/background-login/capa-tres.png"} alt="capa tres" />
      <img className="fondo-capas" id="capa-cuatro" src={"img/background-login/capa-cuatro.png"} alt="capa cuatro" />


      <div className="cont-body">
        <div className="cont-login">

          <Container component="main" maxWidth="xl">
            <div className="container" ref={container} >
              <div className="form-container sign-up-container">
                        
                <form action="#" style={{boder:'3px solid red'}}>

                    <h1>Perfil profesional</h1>           
                    <p>Registrese para definir sus días libres y aumentar sus horas laborales.</p>
                    <Link to="/register/professional"><button>Registrar</button></Link>

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
                      name="login"
                      autoComplete="email"
                      onChange={handleForm}
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
                      onChange={handleForm}
                    />
                  </Grid>
                  <a href="#">Recuperar passss</a>
                  <button type="button" onClick={handleLogin}>Continuar</button>

                  <p onClick={movToRight} className="only-mov" >No tengo cuenta → </p>
                </form>
              </div>
              
              <div className="overlay-container">
                  <div className="overlay">
                  <div className="overlay-panel overlay-left">


                    <h1>Cuenta empresa</h1>
                    <p>Encuentre a profesionales con disponibilidad inmediata.</p>
                    <Link to="/register/entity"><button className="ghost" id="signIn">Registrar</button></Link>


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