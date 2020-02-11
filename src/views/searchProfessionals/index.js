import React, { useState } from "react";
import FormSearch from '../../components/searchProfesisonals/formSearch';
import { AppContextSearchProfessional } from '../../context/searchProfessionalsContext';

export default function SearchProfessionals() {
  const [valuesForm, setValuesForm] = useState(null);
  return (
    <AppContextSearchProfessional.Provider value={{
      valuesForm,
      setValuesForm
    }}>
      <FormSearch></FormSearch>
    </AppContextSearchProfessional.Provider>
  );
}
