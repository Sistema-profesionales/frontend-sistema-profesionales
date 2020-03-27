import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import Search from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function CircularIntegration(props) {
    const { text, onClick, loading, success } = props.props;
    const classes = useStyles();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassname}
                    onClick={onClick}
                >
                    {success ? <CheckIcon /> : <Search />}
                </Fab>
                {loading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
            <div className={classes.wrapper} style={{ width: '100%' }}>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={buttonClassname}
                    disabled={loading}
                    onClick={onClick}
                >
                    {text}
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>
    );
}
