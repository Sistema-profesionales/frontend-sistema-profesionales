import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from './CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginBottom: '18px',
  }
}));

export default function AlertGlobal(props) {
  const classes = useStyles();
  const { severity, message, variant, context } = props;
  const { alert, setAlert } = useContext(context);

  return (
    <div className={classes.root}>
      <Collapse in={alert ? true : false}>
        <Alert
          variant={variant ? variant : 'standard'}
          style={{ display: 'inline-table !important' }}
          severity={severity ? severity : 'info'}
          icon={alert && alert.loading !== undefined && alert.loading && severity === 'success' ? <CircularProgress /> : null}
          action={
            <IconButton
            style={{ fontSize: '35px !important' }}
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setAlert(undefined);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          }
        >
          {
            message && Array.isArray(message) ?
              <pre style={{ textAlign: 'justify', fontSize: 'small', margin: 0 }}>{message.join("\n")}</pre> : message
          }
        </Alert>
      </Collapse>
    </div>
  );
}
