import React, { useContext } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ProgressBackDrop(props) {
    const { context } = props; 
    const classes = useStyles();

    const { showProgressBackDrop, setShowProgressBackDrop } = useContext(context);
    return (
        <div>
            <Backdrop className={classes.backdrop} open={showProgressBackDrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
