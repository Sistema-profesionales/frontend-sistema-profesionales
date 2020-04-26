import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import styles from "../default/defaultStyles.css";
import { BrowserRouter } from "react-router-dom";
import AppBar from "./AppBar";
import { AppContextEntities } from '../../../context/AppEntitiesContext';
import { getUserLocalStorage } from '../../../factory/users';
const useStyles = makeStyles(theme => styles(theme));

// EXPORTAR ENTITIESTHEME
export default function EntitiesTheme(props) {
  const classes = useStyles();
  const userLocalStorage = getUserLocalStorage();
  // console.log(userLocalStorage);

  const [valuesForm, setValuesForm] = useState(undefined);
  const [openFullScreenModal, setopenFullScreenModal] = useState(false);
  const [professionalSelected, setProfessionalSelected] = useState(undefined);
  const [redirect, setRedirect] = useState(false);
  const [chipsProfessionals, setChipsProfessionals] = useState([]);
  const [chipsDays, setChipsDays] = useState([]);
  const [showProgressBackDrop, setShowProgressBackDrop] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [resultSearch, setResultSearch] = React.useState(undefined);

  if(!userLocalStorage) window.location.href = '/';  

  return (
    <AppContextEntities.Provider value={{
      valuesForm,
      setValuesForm,
      openFullScreenModal, 
      setopenFullScreenModal, 
      professionalSelected,
      setProfessionalSelected,
      redirect,
      setRedirect,
      userLocalStorage,
      chipsProfessionals,
      setChipsProfessionals,
      chipsDays, 
      setChipsDays,
      showProgressBackDrop, 
      setShowProgressBackDrop,
      page,
      setPage,
      resultSearch, 
      setResultSearch
    }}>
      <BrowserRouter>
        <React.Fragment>
          <AppBar></AppBar>
          <CssBaseline />
          <main className={classes.layout} style={{ marginTop: '0px', paddingRight: '0px' }}>
            {props.children}
          </main>
        </React.Fragment>
      </BrowserRouter>
    </AppContextEntities.Provider>
  );
}
