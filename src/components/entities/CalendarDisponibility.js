
import React, { useContext } from 'react';
import { AppContextViewDisponibility } from '../../context/AppViewDisponibilityContext';
import { AppContextSearchProfessional } from '../../context/AppEntitiesContext';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../../../node_modules/react-big-calendar/lib/sass/styles.scss';

export default function CalendarDisponibility() {
    const localizer = momentLocalizer(moment);
    const { events, setEventsCalendar } = useContext(AppContextViewDisponibility);
    const { valuesForm } = useContext(AppContextSearchProfessional);


    const handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title)
            setEventsCalendar( [
                    ...events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
            )
    }

    const onSelectEvent = (event) => {
        // console.log({ event, date: valuesForm.date });
        let eventsAux = events;
        let findIndex = eventsAux.findIndex(x => x.id === event.id);

        eventsAux.splice(findIndex, 1);
        setEventsCalendar(eventsAux);
        console.log(findIndex);
    }

    return (
        <React.Fragment>
            <Calendar
                style={{ padding: '40px' }}
                // selectable
                localizer={localizer}
                events={events}
                defaultView={Views.MONTH}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={valuesForm.date}
                onSelectEvent={onSelectEvent}
                onSelectSlot={handleSelect}
            />
        </React.Fragment>
    );
}