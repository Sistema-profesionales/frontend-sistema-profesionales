import React, { useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField, Grid } from '@material-ui/core';
import { AppContextRegister } from '../../../context/AppContextRegister';
import { getRegions, getProvinciesByRegion } from '../../../factory/regions';
import { getCommunesByProvince } from '../../../factory/provincies';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function StepPersonalData() {

    const [regions, setRegions] = useState([]);
    const [provincies, setProvincies] = useState([]);
    const [communes, setCommunes] = useState([]);

    const {
        professional,
        setSendObject,
        sendObject,
        values,
        setValues
    } = useContext(AppContextRegister);

    useEffect(() => {
        setSendObject({
            ...sendObject,
            names: professional?.names,
            lastNames: professional?.lastNames,
            email: sendObject?.email || null,
            phone: sendObject?.phone || null,
            password: sendObject?.password || null,
            passwordConfirm: sendObject.passwordConfirm || null,
            specialities: professional?.specialities
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function regions() {
            try {
                let regions = await getRegions();

                for (let i = 0; i < regions.length; i++) {
                    regions[i]["title"] = regions[i].name;
                }

                setRegions(regions);

                if(values?.region) {
                    await getProvincesRegion(values?.region.id);
                }

                if(values?.provincie) {
                    await getCommunesProvince(values?.provincie.id);
                }

            } catch (error) {
                console.log(error);
            }
        }
        regions();

    }, [values]);

    const getProvincesRegion = async (regionId) => {
        try {
            let provincies = await getProvinciesByRegion(regionId);
            for (let i = 0; i < provincies.length; i++) {
                provincies[i]["title"] = provincies[i].name;
            }

            setProvincies(provincies);
        } catch (error) {
            console.log(error);
        }
    }

    const getCommunesProvince = async (provinceId) => {
        try {
          let communes = await getCommunesByProvince(provinceId);
          for (let i = 0; i < communes.length; i++) {
            communes[i]["title"] = communes[i].name;
          }
    
          setCommunes(communes);
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <React.Fragment>
            <Grid container spacing={2} style={{ padding: '25px' }}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        Continuemos {`${professional?.lastNames}, ${professional?.names}`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                    Estas a un paso de completar tu información, si deseas puedes indicarnos en donde te gustaría trabajar o si gustas <strong>puedes completar esta información mas tarde</strong>
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        id="fixed-tags-demo"
                        options={regions}
                        getOptionLabel={option => option.title}
                        value={values.region}
                        onChange={(event, newValue) => {
                            setValues({ ...values, region: newValue });
                            if (newValue) getProvincesRegion(newValue.id);
                            else setProvincies([]);
                        }}
                        style={{ width: '100%' }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Región"
                                variant="outlined"
                                placeholder="Buscar"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        id="fixed-tags-demo"
                        options={provincies}
                        getOptionLabel={option => option.title}
                        value={values.provincie}
                        onChange={(event, newValue) => {
                            setValues({ ...values, provincie: newValue });
                            if (newValue) getCommunesProvince(newValue.id);
                        }}
                        style={{ width: '100%' }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Provincia"
                                variant="outlined"
                                placeholder="Buscar"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        id="fixed-tags-demo"
                        options={communes}
                        getOptionLabel={option => option.title}
                        value={values.commune}
                        onChange={(event, newValue) => {
                            setValues({ ...values, commune: newValue });
                            setSendObject({ ...sendObject, communeId: newValue?.id }); 
                        }}
                        noOptionsText={false}
                        style={{ width: '100%' }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Comuna"
                                variant="outlined"
                                placeholder="Buscar"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}