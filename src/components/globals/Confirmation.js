import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Confirmation(props) {
    const { context, title, onCancel, onAccept, message } = props;

  const { showConfirmation, setShowConfirmation } = useContext(context);


  return (
    <div>
      <Dialog
        open={showConfirmation}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title || ''}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message || ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onAccept} color="primary">
            Si, eliminar
          </Button>
          <Button onClick={onCancel} color="primary" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
