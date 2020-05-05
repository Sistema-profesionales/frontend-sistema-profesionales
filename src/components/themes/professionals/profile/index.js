import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Presentacion from './Presentation';

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

export default function Index () {
    const classes = useStyles();

  return (
    <div className={classes.root}>
     <Presentacion></Presentacion>
    </div>
  );
}