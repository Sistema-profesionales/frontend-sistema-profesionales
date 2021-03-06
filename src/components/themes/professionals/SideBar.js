import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import styles from './style.css';
import { AppContextProfessionals } from '../../../context/AppProfessionalsContext';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => styles(theme));

export default function Sidebar() {
  const classes = useStyles();

  const { open } = useContext(AppContextProfessionals);

  return (
    <Drawer
      style={{ marginTop: '65px' }}
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >

      <List>
        <Link to="/user/professional/profile" style={{ textDecoration: 'none', color: '#212121' }}>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Mi perfil" />
          </ListItem>
        </Link>
        <Link to="/user/professional/disponibilities" style={{ textDecoration: 'none', color: '#212121' }}>
          <ListItem button>
            <ListItemIcon>
              <ScheduleIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Disponibilidad" />
          </ListItem>
        </Link>
        <Link to="#" onClick={() => { localStorage.removeItem("userLogged"); window.location.href="/"; }} style={{ textDecoration: 'none', color: '#212121' }}>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}