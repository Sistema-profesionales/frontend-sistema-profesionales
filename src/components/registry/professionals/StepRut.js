import React, { useContext, useState, useRef } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { AppContextRegister } from '../../../context/AppContextRegister';
import { getInfoUserMinsal } from '../../../factory/users';
import ProgressButton from '../../globals/ProgressButton';
import { formatRut, acceptNumbersInRut } from '../../../helpers/utilities';

export default function FormRut() {
    const inputRut = useRef(null);
    const {
        handleChangeInputText,
        setSendObject,
        sendObject,
        setAlert,
        setActiveStep,
        setIsUserValid,
        setProfessional,
        success,
        setSuccess
    } = useContext(AppContextRegister);
    const [loading, setLoading] = useState(false);
    const [rutFormat, setRutFormat] = React.useState(undefined);

    const handleBlurRut = () => {
        try {
            if (sendObject && sendObject.rut) {
                let rut = formatRut(sendObject.rut);
                if (rut && rut.rutFormatter) {
                    console.log(rut);

                    setRutFormat({
                        rutFormatter: rut.rutFormatter,
                        rutQuery: rut.rutQuery
                    });

                    setSendObject({
                        ...sendObject,
                        rut: rut.rutQuery
                    })
    
                } else {
                    setRutFormat(undefined);
                }
            }    
        } catch (error) {
            setAlert({
                variant: 'filled',
                severity: 'error',
                message: error.message
            });
        }
        
    }

    const handleKeyPressRut = () => {
        if (sendObject && sendObject.rut) {
            let accepts = acceptNumbersInRut(sendObject.rut);
            setRutFormat({
                rutFormatter: accepts
            });
        } else {
            setRutFormat(undefined);
        }

    }

    const verifyUserMinsal = async () => {
        try {
            setLoading(true);
            if ((!sendObject && !sendObject?.rut) || sendObject?.rut?.length === 0) {
                setAlert({
                    variant: 'filled',
                    severity: 'error',
                    message: "Por favor indicanos tu RUT"
                });
                setLoading(false);
                setSuccess(false);
            } else {
                setAlert(undefined);
                const verify = await getInfoUserMinsal(rutFormat.rutQuery);

                if (verify) {
                    console.log(verify);
                    setProfessional(verify);
                    setActiveStep(1);
                    setIsUserValid(true);
                    setLoading(false);
                    setSuccess(true);
                }
            }
        } catch (error) {
            setLoading(false);
            setSuccess(false);
            setAlert({
                variant: 'filled',
                severity: 'error',
                message: error.message
            });
        }
    }

    return (
        <React.Fragment>
            <Grid item xs={12} sm={12}>
                <TextField
                    ref={inputRut}
                    value={rutFormat ? rutFormat.rutFormatter : sendObject ? sendObject?.rut : ''}
                    name="rut"
                    variant="outlined"
                    fullWidth
                    id="rut"
                    label="RUT"
                    autoFocus
                    onChange={handleChangeInputText}
                    onBlur={handleBlurRut}
                    onFocus={() => { setRutFormat(undefined) }}
                    onKeyUp={handleKeyPressRut}
                />
            </Grid>
            <ProgressButton props={{
                onClick: verifyUserMinsal,
                loading,
                success,
                setSucess: (status) => { setSuccess(status) },
                text: success ? 'ESTAS VERIFICADO' : 'VERIFICAR MI INFORMACION',
                setLoading: (status) => { setLoading(status) }
            }}></ProgressButton>
        </React.Fragment>
    );
} 