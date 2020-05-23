import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { AppContextRegister } from '../../../context/AppContextRegister';
import Location from '../../globals/Location';

export default function StepPersonalData() {

    const {
        professional,
        setSendObject,
        sendObject,
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

                <Location context={AppContextRegister} />
            </Grid>
        </React.Fragment>
    );
}