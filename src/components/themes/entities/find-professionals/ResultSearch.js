import React , { useEffect } from "react";
// import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { List, Grid, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { daysOfWeek } from '../../../../constants/timesAndDays';
// import ProgressSkeleton from '../../../globals/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    maxHeight: 400,
    overflowY: 'auto'
  },
  inline: {
    display: "inline",
    marginRight: '5px'
  },
  dayDisponibility: {
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    backgroundColor: 'green',
    color: 'white',
    borderRadius: '50%',
    textAlign: 'center',
    padding: '5px !important',
    marginRight: '5px',
    // padding: '6px 13px 0px 13px',
    cursor: 'pointer',

  },
  dayNotDisponibility: {
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    backgroundColor: 'darkgrey',
    color: 'white',
    borderRadius: '50%',
    textAlign: 'center',
    padding: '5px !important',
    marginRight: '5px',
  }
}));



// EXPORTAR LIST PROFESSIONALS

export default function ListProfessionals(props) {
  const classes = useStyles();
  //   const {
  //     setProfessionalSelected,
  //     setopenFullScreenModal,
  //     valuesForm,
  //     setRedirect
  //   } = useContext(AppContextSearchProfessional);

  // console.log(props.data);
  const data = props.data;


  const [loading, setLoading] = React.useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  // }, []);

  // if(loading) return (<ProgressSkeleton />);

  return (
    <React.Fragment>
      <List className={classes.root}>
        {data.map((e, i) => (
          <div key={i}>
            <ListItem
              alignItems="flex-start"
            //   onClick={() => {
            //     setProfessionalSelected(e);
            //     setopenFullScreenModal(true);
            //   }}
            >
              <ListItemAvatar>
                {/* <Avatar alt="Remy Sharp" src={e.img} /> */}
                <Avatar>H</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<div style={{ fontWeight: 'bold' }}>{e.professions.map(e => e)}</div>}
                secondary={
                  <React.Fragment>
                     <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      
                    {`${e.names} ${e.lastNames}`}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textSecondary"
                    >
                      
                    {e.commune}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Grid container spacing={2}>
                  {
                    daysOfWeek.map((d, index) => 
                      <Grid key={`day${index}`} item className={e.disponibilities && e.disponibilities.find(x => x.dayOfWeek === d.day) ? classes.dayDisponibility : classes.dayNotDisponibility}>
                        {
                          e.disponibilities && e.disponibilities.find(x => x.dayOfWeek === d.day) ?
                          <Tooltip title={e.disponibilities && e.disponibilities.find(x => x.dayOfWeek === d.day).hours.map((e, idx) => <p key={`p${idx}`} style={{ margin: 0, padding: 0 }}>{e}</p>)} placement="top">
                            <span>{d.alias}</span>
                          </Tooltip> :
                          <span>{d.alias}</span>
                        }
                        
                      </Grid>
                    )
                  }
                </Grid>
                
                {/* <Rating
                  name="simple-controlled"
                  value={e.ranking}
                /> */}
              </Box>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" color="primary" style={{ marginTop: '20px' }} disableElevation>
            Cargar mas resultados
          </Button>
        </div>
      </List>
      {/* <Icon>
        <ArrowBackIcon style={{ fontSize: "50px", float: "right", cursor: 'pointer' }} />
      </Icon> */}
      {/* <ViewDisponibility /> */}
    </React.Fragment>
  );
}
