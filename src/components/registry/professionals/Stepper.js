import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import WorkIcon from '@material-ui/icons/Work';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepRut from './StepRut';
import StepPersonalData from './StepPersonalData';
import StepLocationWork from './StepLocationWork';
import { AppContextRegister } from '../../../context/AppContextRegister';
import Alert from '../../globals/Alert';
import { createUserProfessional } from '../../../factory/users';
import { useHistory } from 'react-router-dom';

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
                fontWeight: 'bold'
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        fontWeight: 'bold'
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <Check />,
        2: <SettingsIcon />,
        3: <WorkIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Validar mi RUT', 'Mis datos personales', 'Donde me gustaria trabajar'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (<StepRut></StepRut>) || null;
        case 1:
            return (<StepPersonalData></StepPersonalData>) || null;
        case 2:
            return (<StepLocationWork></StepLocationWork>) || null;
        default:
            return null;
    }
}

export default function CustomizedSteppers() {
    let history = useHistory();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [sendObject, setSendObject] = React.useState(undefined);
    const [alert, setAlert] = React.useState(undefined);
    const [isUserValid, setIsUserValid] = React.useState(false);
    const [professional, setProfessional] = React.useState(undefined);
    const [success, setSuccess] = React.useState(false);
    const [values, setValues] = React.useState({
        region: null,
        provincie: null,
        commune: null
    });

    const saveUser = async () => {
    try {
        setAlert({
            variant: 'filled',
            severity: 'success',
            message: "Te has registrado con éxito, serás redirigido para iniciar sesión",
            loading: true
        });
      let newUserProfessional = await createUserProfessional(sendObject);
      //console.log(newUserProfessional);
      if (newUserProfessional) {
        setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
      setAlert({
        variant: 'filled',
        severity: 'error',
        message: error.message
      });
    }
  }

    const handleChangeInputText = (event) => {
        let { name, value } = event.target;
        setSendObject({ ...sendObject, [name]: value });
    }

    const handleNext = async () => {
        if(activeStep === 1 && sendObject) {
            if(!sendObject.phone || !sendObject.email || !sendObject.password || !sendObject.passwordConfirm) {
                setAlert({
                    variant: 'filled',
                    severity: 'error',
                    message: 'Todos los campos son requeridos'
                });

                return;
            } else {
                if(sendObject.password !== sendObject.passwordConfirm) {
                    setAlert({
                        variant: 'filled',
                        severity: 'error',
                        message: 'Las contraseñas no coinciden'
                    });
    
                    return;
                } 
            }
        }

        if(activeStep === 2 && sendObject) {
            // console.log("end step ");
            // console.log(sendObject);
            setAlert(undefined);
            
            await saveUser();
            return;
        }

        // setAlert(undefined);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <AppContextRegister.Provider value={{
            alert,
            setAlert,
            setSendObject,
            sendObject,
            handleChangeInputText,
            activeStep,
            setActiveStep,
            isUserValid,
            setIsUserValid,
            professional,
            setProfessional,
            values,
            setValues,
            success,
            setSuccess
        }}>
            
            <div className={classes.root}>
                <Alert {...alert} context={AppContextRegister}></Alert>

                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                
                <div>
                    {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                        All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                        Reset
                        </Button>
                    </div>
                    ) : (
                    <div>
                        {getStepContent(activeStep)}
                        {
                            !isUserValid ? null
                            :
                            <div style={{ padding: '35px' }}>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Anterior
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Finalizado' : 'Siguiente'}
                            </Button>
                        </div>
                        }
                        
                    </div>
                    )}
            </div>
        </div>
        </AppContextRegister.Provider>
    );
}