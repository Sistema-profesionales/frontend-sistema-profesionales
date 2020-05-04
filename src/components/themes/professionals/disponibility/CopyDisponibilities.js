import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { AppContextDisponibility } from '../../../../context/AppContextDisponibility';
import { daysOfWeek } from '../../../../constants/timesAndDays';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));

export default function ConfirmationDialogRaw() {
    const classes = useStyles();

    const [checkedDays, setCheckedDays] = useState({
        "Lunes": false,
        "Martes": false,
        "Miercoles": false,
        "Jueves": false,
        "Viernes": false,
        "Sabado": false,
        "Domingo": false,
    });

    const [copy, setCopy] = useState([]);
    const {
        showCopyDisponibilties,
        setShowCopyDisponibilties,
        disponibilitiesUserBD,
        disponibilityByDay,
        handleClickSaveDisponibility
    } = useContext(AppContextDisponibility);

    let options = daysOfWeek.filter(x => disponibilitiesUserBD && disponibilitiesUserBD[x.day] === 0);
    // console.log(showCopyDisponibilties);

    React.useEffect(() => {
        //   console.log("MOUNTED");
        setCheckedDays({
            "Lunes": false,
            "Martes": false,
            "Miercoles": false,
            "Jueves": false,
            "Viernes": false,
            "Sabado": false,
            "Domingo": false,
        });
    }, []);

    const handleChange = (event) => {
        setCheckedDays({ ...checkedDays, [event.target.name]: event.target.checked });

        if (event.target.checked) {
            let array = [];
            let disponibilities = disponibilityByDay.disponibilities;
            for (let i = 0; i < disponibilities.length; i++) {
                let object = {
                    userId: disponibilityByDay.userId,
                    dayOfWeek: event.target.name,
                    startHour: disponibilities[i].startHour,
                    endHour: disponibilities[i].endHour
                }
                array.push(object);
            }

            setCopy([
                ...copy,
                ...array
            ])
        } else {
            setCopy([
                ...copy.filter(x => x.dayOfWeek !== event.target.name),
            ])
        }
        // console.log(disponibilityByDay);
    };

    const saveMultipleDisponibilities = async () => {
        handleClickSaveDisponibility(copy);
    }

    if (options.length === 0) return null;


    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={showCopyDisponibilties}
            classes={{
                paper: classes.paper,
            }}

        >
            <DialogTitle id="confirmation-dialog-title">Copiar para los dias</DialogTitle>
            <DialogContent dividers>
                <FormGroup>
                    {options.map((option) => (
                        <FormControlLabel
                            control={<Checkbox disabled={disponibilitiesUserBD && disponibilitiesUserBD[option.day] === 0 ? false : true} checked={checkedDays[option.day]} onChange={handleChange} name={option.day} />}
                            // value={option.day} 
                            key={option.id}
                            label={option.day} />
                    ))}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={saveMultipleDisponibilities} color="primary">
                    REPETIR
                </Button>
                <Button onClick={() => { setShowCopyDisponibilties(false); }} color="primary">
                    CANCELAR
                </Button>
            </DialogActions>
        </Dialog>
    );
}