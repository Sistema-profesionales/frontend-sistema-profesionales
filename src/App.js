import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid } from "@material-ui/core";
// import FormSearch from '../../components/searchProfesisonals/formSearch';
// import CopyRight from '../../components/copyright/index';
import styles from './styles.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../src/routes/routes';

const useStyles = makeStyles(theme => (styles(theme)));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
        <React.Fragment>
          <Grid item sm={2} xs={4} style={{ padding: '15px' }}>
            <img src={"./img/logogray.png"} width="40"></img>
          </Grid>
          <CssBaseline />
          <main className={classes.layout}>
            <Routes></Routes>
            {/* <CopyRight /> */}
          </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
