import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField, Grid } from '@material-ui/core';
import { AppContextRegister } from '../../../context/AppContextRegister';

export default function StepPersonalData() {
    const {
        professional,
        setSendObject,
        sendObject,
        handleChangeInputText
    } = useContext(AppContextRegister);

    React.useEffect(() => {
        setSendObject({
            ...sendObject,
            names: professional?.names?.trimStart(),
            lastNames: professional?.lastNames?.trimStart(),
            email: sendObject?.email || null,
            phone: sendObject?.phone || null,
            password: sendObject?.password || null,
            passwordConfirm: sendObject.passwordConfirm || null,
            professions: professional?.professions,
            specialities: professional?.specialities
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} style={{ padding: '25px' }}>
                    <Typography variant="h6" gutterBottom>
                        Bienvenid@ {`${professional?.lastNames}, ${professional?.names}`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                    Continúa completando tu información y ya estarás <strong>LISTO</strong> para que las instituciones puedan <strong>ENCONTRARTE</strong>
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