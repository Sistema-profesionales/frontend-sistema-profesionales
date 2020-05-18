import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
//     tooltip: {
//         paddingRight: 0
//     },
//     absolute: {
//         left: theme.spacing(3),
//     },
// }));

export default function Dcouments() {
    // const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ fontSize: '1.5rem', lineHeight: '1.33333', fontWeight: '400', marginTop: '30px' }}>
                Documentos y certificados
            </Grid>
        </Grid>
    );
}