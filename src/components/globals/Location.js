import React, { useEffect, useState, useContext } from 'react';
import { Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getRegions, getProvinciesByRegion } from '../../factory/regions';
import { getCommunesByProvince } from '../../factory/provincies';

export default function Location(props) {
    const { context } = props;
    const [regions, setRegions] = useState([]);
    const [provincies, setProvincies] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [values, setValues] = useState({
        area: null,
        profession: null,
        region: null,
        provincie: null,
        commune: null,
        entity: null
    });

    const { sendObject, setSendObject, user } = useContext(context);

    useEffect(() => {
        async function regions() {
            try {
                let regions = await getRegions();

                for (let i = 0; i < regions.length; i++) {
                    regions[i]["title"] = regions[i].name;
                }

                setRegions(regions);

                if(user) {
                    let provincies = user.provincies;
                    let communes = user.communes;

                    setProvincies(provincies);
                    setCommunes(communes);

                    let findRegion = regions.find(x => x.id === user.regionId);
                    setValues({ ...values,  region: findRegion, provincie: user.findProvince, commune: user.findCommune });
                }
            } catch (error) {
                console.log(error);
            }
        }
        regions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getProvincesRegion = async (regionId) => {
        try {
            let provincies = await getProvinciesByRegion(regionId);
            for (let i = 0; i < provincies.length; i++) {
                provincies[i]["title"] = provincies[i].name;
            }
            return provincies;
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

            return communes;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                    id="fixed-tags-demo"
                    options={regions}
                    getOptionLabel={option => option.title}
                    value={values.region}
                    onChange={async (event, newValue) => {
                        setValues({ ...values, region: newValue, provincie: null, commune: null });
                        if (newValue) {
                            let provincies = await getProvincesRegion(newValue.id);
                            setProvincies(provincies)
                        }
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
                    onChange={async (event, newValue) => {
                        setValues({ ...values, provincie: newValue, commune: null });
                        if (newValue) {
                            let communes = await getCommunesProvince(newValue.id);;
                            setCommunes(communes)
                        }
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
                        if (newValue) setSendObject({ ...sendObject, communeId: newValue.id });
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
        </React.Fragment>
    )
}