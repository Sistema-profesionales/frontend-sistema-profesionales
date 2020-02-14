import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { AppContextSearchProfessional } from '../../context/AppProfessionalsContext';
import { AppContextViewDisponibility } from '../../context/AppViewDisponibilityContext';
import CalendarDisponibility from './calendarDisponibility';
import events from './events';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const { openFullScreenModal, setopenFullScreenModal, professionalSelected } = useContext(AppContextSearchProfessional);
  const [eventsCalendar, setEventsCalendar] = useState([]);

  useEffect(() => {
    setEventsCalendar(events);

}, [])

  return (
    <AppContextViewDisponibility.Provider value={{
      msg: "hola mundo",
      events: eventsCalendar,
      setEventsCalendar
    }}>
      <div>
        <Dialog fullScreen open={openFullScreenModal} onClose={() => { setopenFullScreenModal(false) }} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={() => { setopenFullScreenModal(false) }} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Disponibilidad {professionalSelected ? professionalSelected.name : ''}
              </Typography>
            </Toolbar>
          </AppBar>
         <CalendarDisponibility></CalendarDisponibility>
        </Dialog>
      </div>
    </AppContextViewDisponibility.Provider>
  );
}
