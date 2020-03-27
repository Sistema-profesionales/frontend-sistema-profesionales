import React, { useContext, useState, useRef } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import { AppContextRegister } from '../../../context/AppContextRegister';
import { getInfoUserMinsal } from '../../../factory/users';
import ProgressButton from '../../globals/ProgressButton';
import StepLocationWork from './StepLocationWork';
import { formatRut, acceptNumbersInRut } from '../../../helpers/utilities';

export default function FormRut() {
    const inputRut = useRef(null);
    const {
        handleChangeInputText,
        sendObject,
        alert,
        setAlert,
        setSendObject,
        setActiveStep,
        isUserValid,
        setIsUserValid,
        professional,
        setProfessional
    } = useContext(AppContextRegister);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = React.useState(false);
    const [rutFormat, setRutFormat] = React.useState(undefined);


    const handleBlurRut = () => {
        if (sendObject && sendObject.rut) {
            let rut = formatRut(sendObject.rut);

            if (rut && rut.rutFormatter) {
                setRutFormat({
                    rutFormatter: rut.rutFormatter,
                    rutQuery: rut.rutQuery
                });

            } else {
                setRutFormat(undefined);
            }
        }
    }

    const handleKeyPressRut = () => {
        if (sendObject && sendObject.rut) {
            let accepts = acceptNumbersInRut(sendObject.rut);

            console.log(accepts);

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

    if (success) {
        return (<StepLocationWork></StepLocationWork>);
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
                text: 'VALIDAR MI INFORMACION',
                setLoading: (status) => { setLoading(status) }
            }}></ProgressButton>
        </React.Fragment>
    );
} 