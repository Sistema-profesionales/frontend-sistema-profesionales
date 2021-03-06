import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { loginUser } from '../../factory/users';
import Alert from '../../components/globals/Alert';
import { AppContextLogin } from '../../context/AppContextLogin';
import './login.css';

export default function Index() {
  const container = useRef(null);
  const [redirect, setRedirect] = React.useState(undefined);
  const [alert, setAlert] = React.useState(undefined);
  const [userAccess, setUserAccess] = React.useState({
    userRutOrEmail: null,
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
      if(!userAccess?.userRutOrEmail || !userAccess?.password) {
        setAlert({
          variant: 'filled',
          severity: 'error',
          message: "Indique sus datos para iniciar sesion"
        });
        return;
      }

      setAlert({
        variant: 'filled',
        severity: 'success',
        message: "Ingresando al sistema",
        loading: true
      });

      let queryUser = await loginUser(userAccess);
      if (queryUser) {
        localStorage.setItem("userLogged", JSON.stringify(queryUser));

        if (queryUser.entityId) {
          setTimeout(() => {
            setRedirect({
              path: "/user/entity"
            });
          }, 2000);
         
        } else {
          setTimeout(() => {
            setRedirect({
              path: "/user/professional/profile"
            });

            setAlert(undefined);
          }, 2000);
        }

      }
      
    } catch (error) {
      setAlert({
        variant: 'filled',
        severity: 'error',
        message: error.message
      });
    }

  }

  if (redirect) {
    return (<Redirect from='/' to={redirect.path} />);
  }

  return (
    <AppContextLogin.Provider value={{
      alert,
      setAlert
    }}>
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
                  <form style={{ boder: '3px solid red' }}>
                    <h1>Perfil profesional</h1>
                    <p>Registrese para definir sus días libres y aumentar sus horas laborales.</p>
                    <Link to="/register/professional"><button>Registrar</button></Link>
                    <div onClick={movToLeft} className="only-mov"> Empresa?</div>
                    <p onClick={frontSignIn} className="goLogin">← Ya tengo cuenta.</p>
                  </form>
                </div>
                <div className="form-container sign-in-container">
                  <Alert {...alert} context={AppContextLogin}></Alert>
                  <form><br></br>
                    <h1>Ingrese</h1>
                    <span>sus datos para entrar al sistema</span>
                    <br></br>
                    <Grid style={{ width: '100%' }}>
                      <TextField
                        variant="outlined"
                        autoFocus
                        required
                        fullWidth
                        id="login"
                        label="Rut o correo electronico"
                        name="userRutOrEmail"
                        autoComplete="login"
                        onChange={handleForm}
                      />
                    </Grid>
                    <br></br>
                    <Grid style={{ width: '100%' }}>
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
                    <Link to="#">Recuperar contraseña</Link>
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
    </AppContextLogin.Provider>
  );
}