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
import { getFindProfessionalsByFilters } from '../../../../factory/users';
import { daysOfWeek } from '../../../../constants/timesAndDays';
import { AppContextEntities } from '../../../../context/AppEntitiesContext';
import CircularProgress from '../../../globals/CircularProgress';
import PhoneIcon from '@material-ui/icons/Phone';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';
import SendWhatsApp from './SendWhatsApp';
import './style.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    maxHeight: 300,
    overflowY: 'auto'
  },
  textExpansionPanel: {
    width: '50%', float: 'left', textAlign: 'right', padding: '5px', fontSize: '15px', fontStyle: 'italic'
  },
  inline: {
    display: "inline",
    marginRight: '5px'
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#e4dede',
      color: 'var(--color-hover-text)',
      cursor: 'pointer',
    }
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

export default function ListProfessionals(props) {
  const classes = useStyles();

  const {
    setPage,
    page,
    showProgressBackDrop,
    setShowProgressBackDrop,
    valuesForm,
    resultSearch,
    setResultSearch,
    openWhatsApp, 
    setOpenWhatsApp,
    setProfessionalSelected,
  } = useContext(AppContextEntities);

  let listRef = useRef(null);

  const data = props.data;

  const scrollResult = () => {
    let content = listRef.current;
    if (content.scrollHeight - content.scrollTop === content.clientHeight && data && data.response && data.response.length < data.countResult) {
      loadMoreResult();
    }
  }

  const loadMoreResult = async () => {
    setPage(page + 1);
    try {
      setShowProgressBackDrop(true);
      const data = await getFindProfessionalsByFilters(valuesForm, page + 1);
      if (data.response && data.response.length > 0) {
        setResultSearch({
          response: [...resultSearch.response, ...data.response],
          countResult: resultSearch.countResult
        });
      }

    } catch (error) {
      console.log(error);
    } finally {
      setShowProgressBackDrop(false);
    }
  }

  const onchangePanel = (panel) => event => {
    // console.log(panel);
    let panelCLASS = document.getElementsByClassName("panel-open");
    let panelDOM = document.getElementById(panel);

    if (panelDOM.style.display === "block") {
      panelDOM.style.display = "none";
    } else {
      panelDOM.style.display = "block";
    }

    for (let i = 0; i < panelCLASS.length; i++) {
      if (panelCLASS[i] !== panelDOM) {
        panelCLASS[i].style.display = "none";
      }
    }

  }

  const sendWhatsAppProfessional = (professional) => event => {
    setOpenWhatsApp(true);
    setProfessionalSelected(professional)
  }


  // console.log({ showProgressBackDrop, page, more, resultSearch });
  return (
    <React.Fragment>
      { openWhatsApp ? <SendWhatsApp /> : null}
      <List className={classes.root} id="list" ref={listRef} onScroll={scrollResult}>

        {data && data.response && data.response.length > 0 ? data.response.map((e, i) => (
          <div key={i}>
            {/* <Tooltip title="Expande para ver informacion de contacto" arrow> */}
            <ListItem
              className={classes.listItem}
              alignItems="flex-start"
              style={{ cursor: 'pointer' }}
              onClick={onchangePanel(`panel${i}`)}
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
              <Box component="fieldset" mb={3} borderColor="transparent" style={{ marginBottom: '0px' }}>
                <Grid container spacing={2} style={{ padding: '12px' }}>
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
            {/* </Tooltip> */}
            
            <Grid container id={`panel${i}`} className="panel-open" style={{ display: 'none', marginTop: '15px' }}>
              <Grid container style={{ padding: '10px' }}>
                <Grid item xs={4} style={{ textAlign: 'center' }}>
                  <div className={classes.textExpansionPanel}>{e.phone}</div>
                  <div style={{ width: '50%', float: 'right', textAlign: 'left' }}><PhoneIcon style={{ fontSize: '26px', color: 'green' }} /></div>

                </Grid>
                <Grid item xs={4} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={sendWhatsAppProfessional(e)}>
                  <div className={classes.textExpansionPanel}>Enviar WhatsApp</div>
                  <div style={{ width: '50%', float: 'right', textAlign: 'left' }}><WhatsAppIcon style={{ fontSize: '26px', color: 'darkgreen' }} /></div>
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'center' }}>
                  <div className={classes.textExpansionPanel}>{e.email}</div>
                  <div style={{ width: '50%', float: 'right', textAlign: 'left' }}><EmailIcon style={{ fontSize: '26px', color: 'darkred' }} /></div>
                </Grid>
              </Grid>

            </Grid>
            <Divider variant="inset" component="li" />
          </div>
        ))
          : !showProgressBackDrop ?
            <ListItem
              alignItems="flex-start"
              style={{ justifyContent: 'center', fontSize: '21px', fontStyle: 'italic' }}>
              No existen resultados para la busqueda realizada
          </ListItem> : null
        }
      </List>
      {showProgressBackDrop && <div id="loading" style={{ paddingTop: '10px' }}><CircularProgress isCentered={true} size={45} /></div>}
    </React.Fragment>
  );
}
