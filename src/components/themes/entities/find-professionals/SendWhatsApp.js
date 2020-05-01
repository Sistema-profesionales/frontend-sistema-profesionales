import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppContextEntities } from '../../../../context/AppEntitiesContext';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SendIcon from '@material-ui/icons/Send';

export default function FormDialog() {
    const { openWhatsApp, 
        setOpenWhatsApp, 
        professionalSelected,
        setProfessionalSelected 
    } = useContext(AppContextEntities);

    const handleClose = () => {
        setOpenWhatsApp(false);
        setProfessionalSelected(undefined);
    };

    return (
        <div>
            <Dialog open={openWhatsApp} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Contactarse via WhatsApp</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ponerse en contacto con el Sr(a) {professionalSelected?.names} {professionalSelected?.lastNames}
                    </DialogContentText>
                    <TextareaAutosize 
                        defaultValue={`Hola ${professionalSelected?.names} ${professionalSelected?.lastNames}, me gustaría ponerme en contacto con usted, para ver la posibilidad de cubrir algún turno`}
                        autoFocus 
                        aria-label="minimum height" 
                        rowsMin={3} 
                        placeholder="Escribe un mensaje..." 
                        style={{ width: '100%', resize: 'none' }} 
                    />
                </DialogContent>
                <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose} 

                    endIcon={<SendIcon />}
                >
                    Enviar mensaje
                </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
