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
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
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
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Mi perfil" />
          </ListItem>
        </Link>
        <Link to="/user/professional/documents" style={{ textDecoration: 'none', color: '#212121' }}>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Mis documentos" />
          </ListItem>
        </Link>
        <Link to="/user/professional/calendar" style={{ textDecoration: 'none', color: '#212121' }}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Mi calendario" />
          </ListItem>
        </Link>
        {/* <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItem> */}
      </List>
    </Drawer>
  );
}