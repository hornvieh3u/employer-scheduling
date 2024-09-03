// import React, { Fragment } from "react"

// const CalendarView = () => {
//     return (
//         <Fragment>
//             This is Calendar View
//         </Fragment>
//     )
// }
// export default CalendarView

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card } from 'reactstrap';
import '@styles/react/apps/app-calendar.scss';

const CalendarView = () => {
  const handleEventDrop = (info) => {
    // console.log(
    //     "Event has been dropped on: " + info.event.start.toLocaleString()
    // );
  };

  return (
    <Card className="px-2">
      <div className="calendar my-2">
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
          headerToolbar={{
            start: 'sidebarToggle, prev,next, title',
            end: 'dayGridMonth,timeGridWeek'
          }}
          events={[
            { title: 'event 1', date: '2023-02-01' },
            { title: 'event 2', date: '2023-02-02' },
            { title: 'event 3', date: '2023-02-03' }
          ]}
          selectable={true}
          eventDrop={handleEventDrop}
        />
      </div>
    </Card>
  );
};

export default CalendarView;
