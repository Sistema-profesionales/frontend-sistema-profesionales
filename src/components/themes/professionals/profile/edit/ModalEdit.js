import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SaveIcon from '@material-ui/icons/Save';
import { TextField, Grid } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppContextProfessionals } from '../../../../../context/AppProfessionalsContext';
import Location from '../../../../globals/Location';
import Alert from '../../../../globals/Alert';
import CircularProgress from '../../../../globals/CircularProgress';
import { updateUserById } from '../../../../../factory/users';

export default function FormDialog(props) {
    const { context } = props;
    const {
        openModalEdit,
        setOpenModalEdit,
        sendObject,
        setSendObject,
        user,
        setUser,
        alert,
        setAlert
    } = useContext(context);

    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        document.getElementById("root").style.filter = 'blur(2px)';

        setSendObject({ ...sendObject, email: user?.email, phone: user?.phone, communeId: user?.communeId });

        return () => {
            document.getElementById("root").style.filter = 'none';
        };
        // eslint-disable-next-line
    }, []);

    const handleForm = (event) => {
        const { name, value } = event.target;
        setSendObject({ ...sendObject, [name]: value });
    }

    const handleClickUpdate = async () => {
        try {
            setLoading(true);
            let update = await updateUserById(sendObject, user.id);

            if (update) {
                setUser({
                    ...user,
                    email: update?.email,
                    phone: update?.phone,
                    regionId: update?.regionId,
                    regionName: update?.regionName,
                    provinceId: update?.provinceId,
                    provinceName: update?.provinceName,
                    communeId: update?.communeId,
                    communeName: update?.communeName
                });
                setLoading(false);
                setOpenModalEdit(false);
            }
        } catch (error) {
            setLoading(false);
            setAlert({
                severity: 'error',
                message: error.message
            });
        }
    }

    return (
        <div>
            <Dialog open={openModalEdit} onClose={() => { setOpenModalEdit(false) }} aria-labelledby="form-dialog-title">
            {alert ? <Alert {...alert} context={AppContextProfessionals}></Alert> : null}
                <DialogTitle id="form-dialog-title">Editar presentacion</DialogTitle>
                <DialogContent>
                    <React.Fragment>
                        <Grid container spacing={2}>
                            {/* {loading && <CircularProgress isCentered={true} size={45} />} */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    defaultValue={user?.phone || ''}
                                    variant="outlined"
                                    required
                                    id="phone"
                                    label="Telefono"
                                    name="phone"
                                    fullWidth
                                    onChange={handleForm}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    defaultValue={user?.email || ''}
                                    variant="outlined"
                                    required
                                    id="email"
                                    label="Correo electronico"
                                    name="email"
                                    fullWidth
                                    onChange={handleForm}
                                />
                            </Grid>
                            <Location context={AppContextProfessionals} />
                        </Grid>
                    </React.Fragment>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: '10px' }}
                        onClick={() => { setOpenModalEdit(false) }}>
                        Cancelar
                    </Button>
                    <Button
                        style={{ backgroundColor: '#4caf50' }}
                        onClick={handleClickUpdate}
                        variant="contained"
                        disabled={loading}
                        color="secondary"
                        startIcon={loading ? <CircularProgress fontSize={'2px'} size={20} /> : <SaveIcon />}>
                        { loading ? `Guardando` : `Guardar` }
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
