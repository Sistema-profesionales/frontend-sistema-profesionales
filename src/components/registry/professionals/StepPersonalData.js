import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField, Grid, Button } from '@material-ui/core';
import { AppContextRegister } from '../../../context/AppContextRegister';

export default function StepPersonalData() {
    const {
        setActiveStep,
        professional,
        setSendObject,
        sendObject,
        handleChangeInputText
    } = useContext(AppContextRegister);

    React.useEffect(() => {
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
    }, []);

    // console.log(sendObject);

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        Bienvenid@ {`${professional?.lastNames}, ${professional?.names}`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Continua completando tu informacion y ya estaras <strong>LISTO</strong> para que las instituciones puedan <strong>ENCONTRARTE</strong>
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        value={sendObject?.phone || ''}
                        variant="outlined"
                        required
                        id="phone"
                        label="Telefono"
                        name="phone"
                        fullWidth
                        onChange={handleChangeInputText}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={sendObject?.email || ''}
                        variant="outlined"
                        required
                        id="email"
                        label="Correo electronico"
                        name="email"
                        fullWidth
                        onChange={handleChangeInputText}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        type="password"
                        value={sendObject?.password || ''}
                        variant="outlined"
                        required
                        id="password"
                        label="Contraseña"
                        name="password"
                        fullWidth
                        onChange={handleChangeInputText}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="password"
                        value={sendObject?.passwordConfirm || ''}
                        variant="outlined"
                        required
                        id="passwordConfirm"
                        label="Confirmar contraseña"
                        name="passwordConfirm"
                        fullWidth
                        onChange={handleChangeInputText}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}