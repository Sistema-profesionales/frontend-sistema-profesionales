import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getDisponibilityUser, createDisponibility, deleteDisponibilityById } from '../../../../factory/disponibility';
import { AppContextProfessionals } from '../../../../context/AppProfessionalsContext';
import { AppContextDisponibility } from '../../../../context/AppContextDisponibility';
import AddDisponibility from './AddDisponibility';
import ProgressBackDrop from '../../../globals/ProgressBackDrop';
import Alert from '../../../globals/Alert';
import Confirmation from '../../../globals/Confirmation';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        maxHeight: 320,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    buttonAddDisponibility: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function getDays() {
    return [
        { "id": 0, "day": "Lunes" },
        { "id": 1, "day": "Martes" },
        { "id": 2, "day": "Miercoles" },
        { "id": 3, "day": "Jueves" },
        { "id": 4, "day": "Viernes" },
        { "id": 5, "day": "Sabado" },
        { "id": 6, "day": "Domingo" },
    ]
}

export default function TabsOfDays() {
    let days = getDays();
    const classes = useStyles();
    const [alert, setAlert] = React.useState(undefined);
    const [showProgressBackDrop, setShowProgressBackDrop] = React.useState(false);
    const [confirmation, setConfirmation] = React.useState(undefined);
    const [value, setValue] = React.useState(0);
    const [addDisponibility, setAddDisponibility] = React.useState([]);
    const [isAddDisponibility, setIsAddDisponibility] = React.useState(false);
    const [saveDisponibility, setSaveDisponibility] = React.useState(false);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const { userLocalStorage } = useContext(AppContextProfessionals);
    const [sendObject, setSendObject] = React.useState({
        userId: userLocalStorage.id,
        dayOfWeek: null,
        startHour: null,
        endHour: null
    });

    const [values, setValues] = React.useState({
        startHour: null,
        endHour: null
    });

    const getDisponibilityUserBD = async (val) => {
        try {
            setShowProgressBackDrop(true);
            let findValue = days.find(x => x.id === val);
            let array = await getDisponibilityUser(userLocalStorage.id, findValue.day);
            let existsDisponibility = array.filter(x => x.dayOfWeek === findValue.day);
            let elements = [];

            if (existsDisponibility.length > 0) {
                for (let i = 0; i < existsDisponibility.length; i++) {
                    elements.push(<AddDisponibility element={existsDisponibility[i]} handleHourStart={null} />);
                }
                
                setAlert(undefined);
            } else {
                setAlert({
                    // variant: 'filled',
                    severity: 'warning',
                    message: `No has configurado la disponibilidad para este dia`
                });
            }

            setAddDisponibility([
                ...elements
            ]);
        } catch (error) {
            console.log(error);
        } finally {
            setShowProgressBackDrop(false);
        }
    }

    React.useEffect(() => {
        getDisponibilityUserBD(value);
        let dayOfWeek = days.find(x => x.id === value)?.day;
        setSendObject({
            ...sendObject,
            dayOfWeek
        })
    }, []);

    const handleClickSaveDisponibility = async () => {
        try {
            setShowProgressBackDrop(true);
            let create = await createDisponibility(sendObject);
            console.log(create);
            setIsAddDisponibility(false);
            getDisponibilityUserBD(value);
        } catch (error) {
            console.log(error);
        } finally {
            setSendObject({
                ...sendObject,
                startHour: null,
                endHour: null
            });
            setShowProgressBackDrop(false);
        }
    }

    const handleClickDeleteDisponibility = (e) => {
        setShowConfirmation(true);

        const onAccept = async () => {
            try {
                setShowConfirmation(false);
                setShowProgressBackDrop(true);
                let deleteDisponibility = await deleteDisponibilityById(e.id);
                getDisponibilityUserBD(value);
            } catch (error) {
                console.log(error);
            } finally {
                setShowConfirmation(false);
                setShowProgressBackDrop(false);
            }
        }

        const onCancel = () => {
            setShowConfirmation(false);
        }

        setConfirmation({
            onAccept,
            onCancel,
            title: `Eliminar disponibilidad dia ${e.dayOfWeek}`,
            message: `Estas seguro de eliminar el rango de horas entre las ${e.startHour} y ${e.endHour}`
        });
    }

    const handleChange = (event, newValue) => {
        setAddDisponibility([]);
        let dayOfWeek = days.find(x => x.id === newValue)?.day;
        setSendObject({
            ...sendObject,
            dayOfWeek
        })
        setValue(newValue);
        getDisponibilityUserBD(newValue);
    };


    return (
        <AppContextDisponibility.Provider value={{
            values,
            setValues,
            sendObject,
            setSendObject,
            handleClickSaveDisponibility,
            setAddDisponibility,
            addDisponibility,
            saveDisponibility,
            setSaveDisponibility,
            showProgressBackDrop,
            setShowProgressBackDrop,
            alert,
            setAlert,
            isAddDisponibility,
            setIsAddDisponibility,
            handleClickDeleteDisponibility,
            showConfirmation,
            setShowConfirmation
        }}>
            <div className={classes.root}>

                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {
                        days.map((e, i) => (<Tab key={i} label={e.day} {...a11yProps(e.id)} />))
                    }
                </Tabs>
                {
                    <Grid item lg={12} style={{ padding: '15px' }}>

                        <ProgressBackDrop context={AppContextDisponibility}></ProgressBackDrop>
                        <Confirmation {...confirmation} context={AppContextDisponibility}></Confirmation>
                        <Grid item lg={12} xs={12}>
                            <Alert {...alert} context={AppContextDisponibility}></Alert>
                            <Grid item xs={12} sm={12} style={{ height: '40px', width: '100%', float: 'left' }}>
                                <Typography variant="h6" display="block" style={{ textAlign: 'center' }} gutterBottom>
                                    Disponibilidad dia {days.find(x => x.id === value).day}
                                </Typography>
                            </Grid>
                            {
                                addDisponibility.map(e => (e))
                            }

                            <div className={classes.buttonAddDisponibility} onClick={() => { setIsAddDisponibility(true); setAddDisponibility([...addDisponibility, <AddDisponibility element={undefined} />]) }}>
                                {
                                    !isAddDisponibility && <Button color="primary">Agregar Disponibilidad</Button>
                                }
                            </div>
                        </Grid>
                    </Grid>
                }
            </div>
        </AppContextDisponibility.Provider>
    );
}