import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Presentation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ background: "url('/img/globals/banner-medical.jpg')50%/cover", height: '150px'}}>

            <AccountCircleIcon style={{ fontSize: '170px', color: 'lightgrey', position: 'fixed', marginTop: '50px' }} />
        </Grid>
        <Grid item xs={6} style={{ marginTop: '79px' }}>
          <Grid container spacing={3}>

            <Grid item xs={12} style={{ fontSize: '2.1rem', lineHeight: '1.33333', fontWeight: '400' }}>
              Camilo Ismael Bello Peñailillo
              {
                ["Medico Cirujano", "Odontologo"].map(e => <div style={{ fontSize: '1.1rem', lineHeight: '1.33333', padding: '5px' }}>{e}</div>)
              }
              <div style={{ fontSize: '1.1rem', lineHeight: '1.33333', padding: '5px' }}>
              Lota, Region del Bio-Bio, Chile

              </div>
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={6}>
          HOLAAAAA
        </Grid>
      </Grid>
    </div>
  );
}