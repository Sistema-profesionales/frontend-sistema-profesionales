import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Confirmation(props) {
    const { context, title, onCancel, onAccept, message } = props;

  const { showConfirmation } = useContext(context);

  return (
    <div style={{ width: '80%' }}>
      <Dialog
        open={showConfirmation}
        // onClose={handleClose}
        fullWidth
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
          <Button 
            onClick={onAccept} variant="contained"
            color="secondary" 
            startIcon={<DeleteIcon />}>
            Si, eliminar
          </Button>
          <Button onClick={onCancel} color="primary" variant="contained" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
