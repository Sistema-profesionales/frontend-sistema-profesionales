import React, { useState } from "react";
import FormSearch from '../../components/entities/formSearch';
import { AppContextSearchProfessional } from '../../context/AppEntitiesContext';

export default function SearchProfessionals() {
  const [valuesForm, setValuesForm] = useState(null);
  const [openFullScreenModal, setopenFullScreenModal] = useState(false);
  const [professionalSelected, setProfessionalSelected] = useState(undefined);
  const [redirect, setRedirect] = useState(false);
  
  return (
    <AppContextSearchProfessional.Provider value={{
      valuesForm,
      setValuesForm,
      openFullScreenModal, 
      setopenFullScreenModal, 
      professionalSelected,
      setProfessionalSelected,
      redirect,
      setRedirect
    }}>
      <FormSearch></FormSearch>
    </AppContextSearchProfessional.Provider>
  );
}
