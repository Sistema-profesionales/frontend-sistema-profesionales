import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { getUserById } from '../../../../factory/users';
import { AppContextProfessionals } from '../../../../context/AppProfessionalsContext';
import ProgressBackDrop from '../../../globals/ProgressBackDrop';
import Documents from './Documents';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tooltip: {
    paddingRight: 0
  },
  absolute: {
    left: theme.spacing(3),
  },
}));

export default function Presentation() {
  const classes = useStyles();

  const { 
    userLocalStorage, 
    showProgressBackDrop, 
    setShowProgressBackDrop  
  } = useContext(AppContextProfessionals);

  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    async function loadData() {
      try {
        setShowProgressBackDrop(true);
        const user = await getUserById(userLocalStorage.id);
        setUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        setShowProgressBackDrop(false);
      }
    }

    loadData();
    // eslint-disable-next-line
  }, []);

  if(showProgressBackDrop) return (<ProgressBackDrop context={AppContextProfessionals}></ProgressBackDrop>);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ background: "url('/img/globals/banner-medical.jpg')50%/cover", height: '150px' }}>
          <AccountCircleIcon style={{ fontSize: '170px', color: 'lightgrey', position: 'static', marginTop: '24px', background: 'white', borderRadius: '50%' }} />
        </Grid>
        <Grid item xs={6} style={{ marginTop: '47px' }}>
          <Grid container spacing={3}>

            <Grid item xs={12} style={{ fontSize: '1.5rem', lineHeight: '1.33333', fontWeight: '400' }}>
              {user && `${user?.names} ${user?.lastNames}`}

              {
                user && user.professions.map((e, index) =>
                  <div key={index} style={{ fontSize: '1.1rem', lineHeight: '1.33333', padding: '5px' }}>
                    {e}
                  </div>)
              }
              <div style={{ fontSize: '1.1rem', lineHeight: '1.33333', padding: '5px' }}>
                {user && `${user?.provinceName}, Region ${user?.regionName}`}

              </div>
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={4} style={{ fontSize: '1.2rem', lineHeight: '1.33333', fontWeight: 'bold', marginTop: '47px' }}>
          {user && user.specialities.length > 0 ? `Especialidades` : ``}
          {
            user && user.specialities.map((e, index) => <div key={index} style={{ fontSize: '1.1rem', lineHeight: '1.33333', padding: '5px', fontWeight: '400' }}>{e}</div>)
          }
        </Grid>

        <Grid item xs={12} md={2} lg={2} style={{ fontSize: '1.2rem', lineHeight: '1.33333', fontWeight: 'bold', marginTop: '47px' }}>
          <Tooltip className={classes.tooltip} aria-label="edit" title="Editar mi informacion">
            <Fab color="primary" className={classes.absolute}>
              <EditIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>

      <Documents />
    </div>
  );
}