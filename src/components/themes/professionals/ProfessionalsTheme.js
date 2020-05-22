import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import styles from './style.css';
import { AppContextProfessionals } from '../../../context/AppProfessionalsContext';
import { getUserLocalStorage } from '../../../factory/users';
import AppBar from './AppBar';
import Sidebar from './SideBar';
import { BrowserRouter } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => styles(theme));

export default function Dashboard(props) {
  const userLocalStorage = getUserLocalStorage();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [alert, setAlert] = React.useState(undefined);
  const [showProgressBackDrop, setShowProgressBackDrop] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState(undefined);
  const [user, setUser] = React.useState(undefined);
  const [sendObject, setSendObject] = React.useState({
    communeId: null,
    phone: null,
    email: null,
  });

  if(!userLocalStorage) window.location.href = '/';  

  return (
    <BrowserRouter>
      <AppContextProfessionals.Provider value={{
        open,
        setOpen,
        userLocalStorage,
        alert, 
        setAlert,
        showProgressBackDrop, 
        setShowProgressBackDrop,
        confirmation, 
        setConfirmation,
        showConfirmation, 
        setShowConfirmation,
        openModalEdit, 
        setOpenModalEdit,
        sendObject, 
        setSendObject,
        user, 
        setUser
      }}>
        <div className={classes.root}>
          <CssBaseline />

          {/* APP BAR */}
          <AppBar></AppBar>

          <Sidebar></Sidebar>

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container} >
              <Grid container style={{ maxWidth: '100%', flexBasis: 'none' }}>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper className={classes.paper}>
                    { /* AQUI VA EL CONTENIDO DINAMICO */}
                    {props.children}
                  </Paper>
                </Grid>

              </Grid>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </main>
        </div>
      </AppContextProfessionals.Provider>
    </BrowserRouter>
  );
}
