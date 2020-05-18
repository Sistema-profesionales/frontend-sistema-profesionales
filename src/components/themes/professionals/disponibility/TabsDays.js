import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { getDisponibilityUser, createDisponibility, deleteDisponibilityById, deleteDisponibilityByUserIdAndDay } from '../../../../factory/disponibility';
import { AppContextProfessionals } from '../../../../context/AppProfessionalsContext';
import { AppContextDisponibility } from '../../../../context/AppContextDisponibility';
import AddDisponibility from './AddDisponibility';
import ProgressBackDrop from '../../../globals/ProgressBackDrop';
import Alert from '../../../globals/Alert';
import Confirmation from '../../../globals/Confirmation';
import { daysOfWeek } from '../../../../constants/timesAndDays';
import CopyDisponibilities from './CopyDisponibilities';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './style.css';

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
    absolute: {
        left: theme.spacing(3),
    },
    tooltip: {
        paddingRight: 0
    }
}));

export default function TabsOfDays() {
    let days = daysOfWeek;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [addDisponibility, setAddDisponibility] = React.useState([]);
    const [disponibilityByDay, setDisponibilityByDay] = React.useState(undefined);
    const [disponibilitiesUserBD, setDisponibilitiesUserBD] = React.useState(undefined);
    const [isAddDisponibility, setIsAddDisponibility] = React.useState(false);
    const [saveDisponibility, setSaveDisponibility] = React.useState(false);
    const [showCopyDisponibilties, setShowCopyDisponibilties] = React.useState(false);

    const {
        userLocalStorage,
        alert,
        setAlert,
        showConfirmation,
        setShowConfirmation,
        confirmation,
        setConfirmation,
        showProgressBackDrop,
        setShowProgressBackDrop
    } = useContext(AppContextProfessionals);

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

    const disponibilitiesByDay = async (val) => {
        try {
            let findValue = days.find(x => x.id === val);
            let array = await getDisponibilityUser(userLocalStorage.id, findValue?.day);
            let existsDisponibility = array.filter(x => x.dayOfWeek === findValue?.day);
            return existsDisponibility;
        } catch (error) {
            console.log(error);
        }
    }

    const getDisponibilityUserBD = async (val) => {
        try {
            setShowProgressBackDrop(true);
            let existsDisponibility = await disponibilitiesByDay(val);
            // console.log(existsDisponibility);
            let elements = [];

            if (existsDisponibility.length > 0) {
                for (let i = 0; i < existsDisponibility.length; i++) {
                    elements.push(<AddDisponibility key={`dis${i}`} element={existsDisponibility[i]} handleHourStart={null} />);
                }

                setDisponibilityByDay({
                    userId: userLocalStorage.id,
                    dayOfWeek: existsDisponibility[0].dayOfWeek,
                    disponibilities: existsDisponibility
                });
                setAlert(undefined);
            } else {
                setAlert({
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
        async function loadDisponibilities() {
            try {
                setShowProgressBackDrop(true);
                await setDisponibilitiesByDay();
                await getDisponibilityUserBD(value);
                let dayOfWeek = days.find(x => x.id === value)?.day;
                setSendObject({
                    ...sendObject,
                    dayOfWeek
                })

                setShowProgressBackDrop(false);
            } catch (error) {
                console.log(error);
            }
        }

        loadDisponibilities();
        // eslint-disable-next-line
    }, []);

    const setDisponibilitiesByDay = async () => {
        let object = {};
        for (let i = 0; i < daysOfWeek.length; i++) {
            let disponibilities = await disponibilitiesByDay(daysOfWeek[i].id);
            object[daysOfWeek[i].day] = disponibilities?.length;
        }

        setDisponibilitiesUserBD(object);
    }

    const handleClickSaveDisponibility = async (array) => {
        try {
            let object = undefined;

            setShowProgressBackDrop(true);
            if (Array.isArray(array) && array.length > 0) {
                object = array[0];
                setShowCopyDisponibilties(false);
                let arraySaved = [];
                for (let i = 0; i < array.length; i++) {
                    let day = days.find(x => x.day === array[i].dayOfWeek);
                    let save = await createDisponibility(array[i]);

                    console.log({day, save});

                    if(!arraySaved.find(x => x.day === day?.day) && save) {
                        arraySaved.push({
                            id: day?.id,
                            day: day?.day
                        });
                    }
                }
                
                let objectModify = {};
                for (let l = 0; l < arraySaved.length; l++) {
                    let disponibilitiesDay = await disponibilitiesByDay(arraySaved[l].id);
                    objectModify[arraySaved[l].day] = disponibilitiesDay.length;

                }
                setDisponibilitiesUserBD({ ...disponibilitiesUserBD, ...objectModify });
            } else {
                if (!sendObject.startHour || !sendObject.endHour) {
                    setAlert({
                        severity: 'error',
                        message: `Por favor indica las horas de incio y termino`
                    });
                    return;
                }

                object = sendObject;
                await createDisponibility(sendObject);

                let disponibilitiesDay = await disponibilitiesByDay(value);

                setDisponibilitiesUserBD({ ...disponibilitiesUserBD, [object?.dayOfWeek]: disponibilitiesDay?.length });
            }

            setIsAddDisponibility(false);
            await getDisponibilityUserBD(value);


            setShowProgressBackDrop(false);
        } catch (error) {
            setAlert({
                severity: 'error',
                message: error.message
            });
        } finally {
            setSendObject({
                ...sendObject,
                startHour: null,
                endHour: null
            });

        }
    }

    const handleCopyDisponibilities = () => {
        setShowCopyDisponibilties(true);
    }

    const handleClickDeleteDisponibility = (e, day) => {
        setShowConfirmation(true);
        let object = undefined;
        const onAccept = async () => {
            try {
                setShowConfirmation(false);
                setShowProgressBackDrop(true);
                if (!day && e) {
                    await deleteDisponibilityById(e.id);
                    object = e;
                } else {
                    if (!e) {
                        let result = await deleteDisponibilityByUserIdAndDay(userLocalStorage.id, day);
                        if (result.length > 0) {
                            object = result[0];
                        }
                    }
                }

                await getDisponibilityUserBD(value);
                let disponibilitiesDay = await disponibilitiesByDay(value);

                setDisponibilitiesUserBD({
                    ...disponibilitiesUserBD,
                    [object?.dayOfWeek]: disponibilitiesDay?.length
                });

                setShowProgressBackDrop(false);
            } catch (error) {
                console.log(error);
            } finally {
                setShowConfirmation(false);

            }
        }

        const onCancel = () => {
            setShowConfirmation(false);

        }

        setConfirmation({
            onAccept,
            onCancel,
            title: `Eliminar disponibilidad dia ${e && !day ? e.dayOfWeek : day}`,
            message: e ? `Estas seguro de eliminar el rango de horas entre las ${e.startHour} y ${e.endHour}` : `Estas seguro de eliminar todas las horas disponibles?`
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

    // console.log(disponibilitiesUserBD);

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
            isAddDisponibility,
            setIsAddDisponibility,
            handleClickDeleteDisponibility,
            showCopyDisponibilties,
            setShowCopyDisponibilties,
            disponibilitiesUserBD,
            disponibilityByDay,
            setAlert
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
                        days.map((e, i) => (<Tab key={i} label={
                            <div style={{ width: '100%' }}>
                                <div style={{ width: '70%', float: 'left' }}>{e.day}</div>
                                <div style={{ width: '25%', float: 'left', paddingRight: '10px' }}>
                                    {
                                        disponibilitiesUserBD ?
                                            disponibilitiesUserBD[e.day] === 0 ?
                                                <Tooltip title="No has configurado horas disponibles">
                                                    <ErrorIcon style={{ verticalAlign: 'middle', fontSize: '20px', color: '#d29305' }} />
                                                </Tooltip>

                                                :
                                                <Tooltip title={`Hay ${disponibilitiesUserBD[e.day]} horas configuradas`}>
                                                    <CheckCircleIcon style={{ verticalAlign: 'middle', fontSize: '20px', color: 'green' }} />
                                                </Tooltip>
                                            : null
                                    }
                                </div>
                            </div>} {...a11yProps(e.id)} />))
                    }
                </Tabs>
                {
                    <Grid item lg={12} style={{ padding: '15px' }}>
                        {
                            showCopyDisponibilties ?
                                <CopyDisponibilities></CopyDisponibilities>
                                : null
                        }
                        {showProgressBackDrop ? <ProgressBackDrop context={AppContextProfessionals}></ProgressBackDrop> : null}
                        <Grid item lg={12} xs={12}>
                            {
                                showConfirmation ?
                                    <Confirmation {...confirmation} context={AppContextProfessionals}></Confirmation>
                                    : null
                            }
                            {alert ? <Alert {...alert} context={AppContextProfessionals}></Alert> : null}
                            <Grid item xs={12} sm={12} style={{ height: '40px', width: '100%', float: 'left' }}>
                                <Typography variant="h6" display="block" style={{ textAlign: 'center' }} gutterBottom>
                                    Disponibilidad dia {days.find(x => x.id === value).day}
                                    {
                                        addDisponibility.length > 0 && !isAddDisponibility ?
                                            <Tooltip className={classes.tooltip} onClick={() => { handleClickDeleteDisponibility(null, days.find(x => x.id === value).day) }} title={`Borrar disponibilidades del dia ${days.find(x => x.id === value).day}`} aria-label="delete">
                                                <Fab color="secondary" className={classes.absolute}>
                                                    <DeleteSweepIcon />
                                                </Fab>
                                            </Tooltip>
                                            : null
                                    }

                                </Typography>
                            </Grid>
                            {
                                addDisponibility.length > 0 && addDisponibility.map(e => (e))
                            }

                            <div className={classes.buttonAddDisponibility}>
                                {
                                    !isAddDisponibility &&
                                    <Button color="primary" onClick={() => {
                                        setIsAddDisponibility(true);
                                        setAddDisponibility([...addDisponibility, <AddDisponibility key={addDisponibility.length} element={undefined} />])
                                    }}>Agregar Disponibilidad</Button>
                                }
                                {
                                    !isAddDisponibility && addDisponibility.length > 0 &&
                                    // disponibilitiesUserBD?.find(x => x === 0) &&
                                    <Button color="primary" onClick={handleCopyDisponibilities}>Repetir disponibilidad</Button>

                                }
                            </div>
                        </Grid>
                    </Grid>
                }
            </div>
        </AppContextDisponibility.Provider>
    );
}