import React, { useContext } from "react";
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
// import { AppContext } from "../../context/ListProfessionalsContext";
import { AppContextSearchProfessional } from "../../context/AppProfessionalsContext";
import ViewDisponibility from './viewDisponibility';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function AlignItemsList() {
  const classes = useStyles();

  // const { setopenFullScreenModal, setProfessionalSelected } = useContext(AppContext);
  const { setProfessionalSelected, setopenFullScreenModal, valuesForm } = useContext(AppContextSearchProfessional);

  console.log(valuesForm);

  const data = [
    {
      name: "Juan perez",
      img: "/img/avatars/1.jpg",
      comune: "Lota - Chile",
      ranking: 5
    },
    {
      name: "Javier Alvarez",
      img: "/img/avatars/2.jpg",
      comune: "Penco - Chile",
      ranking: 3
    },
    {
      name: "Maria Nuñez",
      img: "/img/avatars/3.jpg",
      comune: "Concepción - Chile",
      ranking: 4
    }
  ];
  return (
    <React.Fragment>
      <List className={classes.root}>
        {data.map((e, i) => (
          <div key={i}>
            <ListItem
              alignItems="flex-start"
              onClick={() => {
                setProfessionalSelected(e);
                setopenFullScreenModal(true);
              }}
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={e.img} />
              </ListItemAvatar>
              <ListItemText
                primary={e.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Ali Connors
                  </Typography>
                    {e.comune}
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
      </List>
      <ViewDisponibility />
    </React.Fragment>

  );
}
