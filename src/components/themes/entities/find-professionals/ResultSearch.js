import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

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
  }
}));

// EXPORTAR LIST PROFESSIONALS

export default function ListProfessionals() {
  const classes = useStyles();
  //   const {
  //     setProfessionalSelected,
  //     setopenFullScreenModal,
  //     valuesForm,
  //     setRedirect
  //   } = useContext(AppContextSearchProfessional);

  const data = [
    {
      id: 1,
      profession: "Medico General",
      img: "/img/avatars/1.jpg",
      name: 'Juan Hernandez',
      comune: "Lota - Chile",
      ranking: 5
    },
    {
      id: 2,
      profession: "Medico cirujano",
      name: 'Juan Hernandez',
      img: "/img/avatars/2.jpg",
      comune: "Penco - Chile",
      ranking: 3
    },
    {
      id: 3,
      profession: "Tecnico en enfermeria",
      name: 'Juan Hernandez',
      img: "/img/avatars/3.jpg",
      comune: "Concepción - Chile",
      ranking: 4
    },
    {
      id: 4,
      profession: "Medico General",
      name: 'Juan Hernandez',
      img: "/img/avatars/1.jpg",
      comune: "Lota - Chile",
      ranking: 5
    },
    {
      id: 5,
      profession: "Medico cirujano",
      name: 'Juan Hernandez',
      img: "/img/avatars/2.jpg",
      comune: "Penco - Chile",
      ranking: 3
    },
    {
      id: 6,
      profession: "Tecnico en enfermeria",
      name: 'Juan Hernandez',
      img: "/img/avatars/3.jpg",
      comune: "Concepción - Chile",
      ranking: 4
    },
    {
      id: 7,
      profession: "Medico General",
      name: 'Juan Hernandez',
      img: "/img/avatars/1.jpg",
      comune: "Lota - Chile",
      ranking: 5
    },
    {
      id: 8,
      profession: "Medico cirujano",
      name: 'Juan Hernandez',
      img: "/img/avatars/2.jpg",
      comune: "Penco - Chile",
      ranking: 3
    },
    {
      id: 9,
      profession: "Tecnico en enfermeria",
      name: 'Juan Hernandez',
      img: "/img/avatars/3.jpg",
      comune: "Concepción - Chile",
      ranking: 4
    },
    {
      id: 10,
      profession: "Medico General",
      name: 'Juan Hernandez',
      img: "/img/avatars/1.jpg",
      comune: "Lota - Chile",
      ranking: 5
    },
    {
      id: 11,
      profession: "Medico cirujano",
      name: 'Juan Hernandez',
      img: "/img/avatars/2.jpg",
      comune: "Penco - Chile",
      ranking: 3
    },
    {
      id: 12,
      profession: "Tecnico en enfermeria",
      name: 'Juan Hernandez',
      img: "/img/avatars/3.jpg",
      comune: "Concepción - Chile",
      ranking: 4
    },
  ];


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
                primary={<div style={{ fontWeight: 'bold' }}>{e.profession}</div>}
                secondary={
                  <React.Fragment>
                     <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      
                    {e.name}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textSecondary"
                    >
                      
                    {e.comune}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                  name="simple-controlled"
                  value={e.ranking}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
                />
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
