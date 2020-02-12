import React, { useState } from "react";
import FormSearch from '../../components/professionals/formSearch';
import { AppContextSearchProfessional } from '../../context/AppProfessionalsContext';

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
