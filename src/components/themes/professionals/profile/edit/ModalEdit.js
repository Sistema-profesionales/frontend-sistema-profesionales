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

export default function FormDialog(props) {
    const { user } = props;
    const { 
        openModalEdit, 
        setOpenModalEdit, 
        sendObject, 
        setSendObject, 
    } = useContext(AppContextProfessionals);

    useEffect(() => {
        document.getElementById("root").style.filter = 'blur(2px)';

        return () => {
            document.getElementById("root").style.filter = 'none';
        };
    }, []);

    return (
        <div>
            <Dialog open={openModalEdit} onClose={() => { setOpenModalEdit(false) }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar presentacion</DialogTitle>
                <DialogContent>
                    <React.Fragment>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    defaultValue={user?.phone || ''}
                                    variant="outlined"
                                    required
                                    id="phone"
                                    label="Telefono"
                                    name="phone"
                                    fullWidth
                                // onChange={handleChangeInputText}
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
                                // onChange={handleChangeInputText}
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
                        onClick={() => { setOpenModalEdit(false) }}>
                        Cancelar
                    </Button>
                    <Button
                        style={{ backgroundColor: '#4caf50' }}
                        // onClick={onAccept} 
                        variant="contained"
                        color="secondary"
                        startIcon={<SaveIcon />}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
