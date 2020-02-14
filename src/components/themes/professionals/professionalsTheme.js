// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import styles from "../default/defaultStyles.css";
// import { BrowserRouter } from "react-router-dom";
// import AppBar from "./AppBar";
// const useStyles = makeStyles(theme => styles(theme));

// export default function ProfessionalsThemeS(props) {
//   const classes = useStyles();
//   return (
//     <BrowserRouter>
//       <React.Fragment>
//         <AppBar></AppBar>
//         <CssBaseline />
//         <main className={classes.layout}>
//           {props.children}
//           {/* <Routes></Routes> */}
//           {/* <CopyRight /> */}
//         </main>
//       </React.Fragment>
//     </BrowserRouter>
//   );
// }


import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './SideBar';
import styles from './style.css';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

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

// const drawerWidth = 240;

const useStyles = makeStyles(theme => styles(theme));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{ width: '100%' }} position="absolute" className={clsx(classes.appBarShift, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
          style={{ marginTop: '65px' }}
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
        
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
      <main className={classes.content}>
        
        
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
              </Paper>
            </Grid>
            {/* Recent Deposits */}

          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
