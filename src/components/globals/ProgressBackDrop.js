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
    const { context, text } = props; 
    const classes = useStyles();

    // useEffect(() => {
    //     document.getElementById("root").style.filter = 'blur(2px)';
    
    //     return () => {
    //       document.getElementById("root").style.filter = 'none';
    //     };
    // }, []);

    const { showProgressBackDrop } = useContext(context);
    return (
        <div id="bkdrop">
            <Backdrop className={classes.backdrop} open={showProgressBackDrop}>
                <CircularProgress color="inherit" style={{ marginRight: '20px' }} /> { text || null } 
            </Backdrop>
        </div>
    );
}
