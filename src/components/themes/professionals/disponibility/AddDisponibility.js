import React, { useContext } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { AppContextDisponibility } from '../../../../context/AppContextDisponibility';
import CloseIcon from '@material-ui/icons/Close';

const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) => `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
);

export default function AddDisponibility(props) {
    let { element } = props;
    const {
        sendObject,
        setSendObject,
        handleClickSaveDisponibility,
        setAddDisponibility,
        addDisponibility,
        setIsAddDisponibility,
        handleClickDeleteDisponibility,
    } = useContext(AppContextDisponibility);

    let value = Math.floor(Math.random() * 110000) + 1;

    return (
        <Grid container key={`frag-${value}`} spacing={3}>
            <Grid key={`1grid-${value}`} item xs={12} sm={5} style={{ float: 'left' }}>
                <Autocomplete
                    key={`start-${value}`}
                    value={element ? element.startHour : sendObject?.startHour}
                    options={timeSlots}
                    onChange={!element ? (event, value) => {
                        setSendObject({
                            ...sendObject,
                            startHour: value
                        });
                    } : null}
                    renderInput={params => <TextField key={`li-start-${params.id}`} {...params} label="Horario inicio" margin="normal" />}
                />
            </Grid>

            <Grid key={`2grid-${value}`} item xs={12} sm={5} style={{ float: 'left' }}>
                <Autocomplete
                    key={`end-${value}`}
                    value={element ? element.endHour : sendObject?.endHour}
                    options={timeSlots}
                    onChange={!element ? (event, value) => {
                        setSendObject({
                            ...sendObject,
                            endHour: value
                        });
                    } : null}
                    renderInput={params => <TextField key={`li-end-${params.id}`} {...params} label="Horario fin" margin="normal" />}
                />
            </Grid>
            <Grid key={`3grid-${value}`} item xs={12} sm={2} style={{ float: 'left' }}>
                {!element ?
                    <div>
                        <Tooltip title="Guardar disponibilidad">
                            <SaveIcon onClick={handleClickSaveDisponibility} style={{ marginTop: '34px', cursor: 'pointer', marginRight: '10px' }} />
                        </Tooltip>
                        <Tooltip title="Cancelar">
                            <CloseIcon style={{ marginTop: '34px', cursor: 'pointer' }} onClick={() => { setAddDisponibility([...addDisponibility.slice(0, addDisponibility.length - 1)]); setIsAddDisponibility(false); }} />
                        </Tooltip>
                    </div>
                    :
                    <Tooltip title="Eliminar disponibilidad">
                        <DeleteIcon style={{ marginTop: '34px', cursor: 'pointer' }} onClick={() => { handleClickDeleteDisponibility(element); }} />
                    </Tooltip>
                }
            </Grid>
        </Grid>
    )
}


