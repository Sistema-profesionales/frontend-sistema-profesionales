
import React, { useContext } from 'react';
import { AppContextViewDisponibility } from '../../context/AppViewDisponibilityContext';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../../../node_modules/react-big-calendar/lib/sass/styles.scss';

export default function CalendarDisponibility() {
    const localizer = momentLocalizer(moment);
    const { events, setEventsCalendar } = useContext(AppContextViewDisponibility);


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

    

    return (
        <React.Fragment>
            <Calendar
                style={{ padding: '40px' }}
                selectable
                localizer={localizer}
                events={events}
                defaultView={Views.MONTH}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={handleSelect}
            />
        </React.Fragment>
    );
}