import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { AppContextProfessionals } from '../../../context/AppProfessionalsContext';
import clsx from 'clsx';
import styles from './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(theme => styles(theme));

export default function SearchAppBar() {
  const classes = useStyles();

  const { open, setOpen, userLocalStorage } = useContext(AppContextProfessionals);

  return (
    <AppBar style={{ width: '100%' }} position="absolute" className={clsx(classes.appBarShift, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => { setOpen(!open); }}
          className={clsx(classes.menuButton)}
        >
          <MenuIcon className={classes.icons} />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Bienvenid@ { `${userLocalStorage.names} ${userLocalStorage.lastNames}`}
      </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
