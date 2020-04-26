import React, { useContext, useRef } from "react";
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
import { getFindProfessionalsByFilters } from '../../../../factory/users';
import { daysOfWeek } from '../../../../constants/timesAndDays';
import { AppContextEntities } from '../../../../context/AppEntitiesContext';
import ProgressBackDrop from '../../../globals/ProgressBackDrop';
import CircularProgress from '../../../globals/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    maxHeight: 280,
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
  const {
    setPage,
    page,
    showProgressBackDrop,
    setShowProgressBackDrop,
    valuesForm,
    resultSearch,
    setResultSearch
  } = useContext(AppContextEntities);

  let listRef = useRef(null);
  // console.log(props.data);
  const data = props.data;
  // console.log(data);

  const [more, setMore] = React.useState(false);

  const scrollResult = () => {
    let content = listRef.current;
    if (content.scrollHeight - content.scrollTop === content.clientHeight && data && data.rows && data.rows.length < data.count) {
      loadMoreResult();
    }
  }

  const loadMoreResult = async () => {
    console.log("EXECUTE");
    setPage(page + 1);
    try {
      setShowProgressBackDrop(true);
      const data = await getFindProfessionalsByFilters(valuesForm, page + 1);
      // console.log(data);
      if (data.rows && data.rows.length > 0) {
        setMore(true);
        setResultSearch({ rows: [...resultSearch.rows, ...data.rows], count: resultSearch.count});
      } else {
        setMore(false);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setShowProgressBackDrop(false);
    }
  }

  
  // console.log({ showProgressBackDrop, page, more, resultSearch });
  return (
    <React.Fragment>
      <List className={classes.root} id="list" ref={listRef} onScroll={scrollResult}>
      
        {data && data.rows && data.rows.map((e, i) => (
          <div key={i}>
            <ListItem
              alignItems="flex-start"
            >
              <ListItemAvatar>
        <Avatar>{e.names.substring(1, 2)}</Avatar>
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
              </Box>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}

        {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button onClick={loadMoreResult} variant="outlined" color="primary" style={{ marginTop: '20px' }} disableElevation>
            Cargar mas resultados
          </Button>
        </div> */}
      </List>
      {showProgressBackDrop && <div id="loading" style={{ paddingTop: '10px'}}><CircularProgress isCentered={true} size={45} /></div>}
    </React.Fragment>
  );
}
