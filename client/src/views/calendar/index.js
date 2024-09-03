// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Third Party Components
import classnames from 'classnames';
import { Row, Col } from 'reactstrap';

// ** Calendar App Component Imports
import EventCalendar from './Calendar';
import AttendanceCalendar from './attendance/Calender';
import SidebarLeft from './SidebarLeft';
import AddEventSidebar from './event/AddEventSidebar';
import AddClass from './attendance/AddClass';

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import {
  selectEvent,
  updateEvent,
  updateFilter,
  updateAllFilters,
  addEvent,
  removeEvent
} from './store';

// ** Styles
import '@styles/react/apps/app-calendar.scss';

// ** CalendarColors
const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
};
const filtersRadio = [
  { label: 'Events', id: 'events', defaultChecked: true },
  { label: 'Appointments', id: 'appointments' },
  { label: 'Booking', id: 'booking' },
  { label: 'Attendance', id: 'attendance' }
];

const CalendarComponent = () => {
  // ** Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.calendar);

  // ** states
  const [calendarApi, setCalendarApi] = useState(null);
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);
  const [addAppSidebarOpen, setAddAppSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(filtersRadio[0]?.label);

  // ** Hooks
  const [isRtl] = useRTL();

  // ** AddEventSidebar Toggle Function
  const handleSidebarOpen = () => setAddSidebarOpen(!addSidebarOpen);

  // ** LeftSidebar Toggle Function
  const toggleSidebar = (val) => setLeftSidebarOpen(val);

  // ** refetchEvents
  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents();
    }
  };
  return (
    <Fragment>
      <div className="app-calendar overflow-hidden border">
        <Row className="g-0">
          <Col
            id="app-calendar-sidebar"
            className={classnames(
              'col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column',
              {
                show: leftSidebarOpen
              }
            )}
          >
            <SidebarLeft
              store={store}
              dispatch={dispatch}
              updateFilter={updateFilter}
              filtersRadio={filtersRadio}
              activeFilter={activeFilter}
              toggleSidebar={toggleSidebar}
              setActiveFilter={setActiveFilter}
              updateAllFilters={updateAllFilters}
              handleSidebarOpen={handleSidebarOpen}
            />
          </Col>
          <Col className="position-relative">
            {activeFilter === 'Events' && (
              <EventCalendar
                isRtl={isRtl}
                calendarApi={calendarApi}
                toggleSidebar={toggleSidebar}
                calendarsColor={calendarsColor}
                setCalendarApi={setCalendarApi}
                handleAddEventSidebar={handleSidebarOpen}
              />
            )}

            {activeFilter === 'Appointments' && (
              <EventCalendar
                isRtl={isRtl}
                calendarApi={calendarApi}
                toggleSidebar={toggleSidebar}
                calendarsColor={calendarsColor}
                setCalendarApi={setCalendarApi}
                handleAddEventSidebar={handleSidebarOpen}
              />
            )}
            {activeFilter === 'Booking' && (
              <EventCalendar
                isRtl={isRtl}
                calendarApi={calendarApi}
                toggleSidebar={toggleSidebar}
                calendarsColor={calendarsColor}
                setCalendarApi={setCalendarApi}
                handleAddEventSidebar={handleSidebarOpen}
              />
            )}
            {activeFilter === 'Attendance' && (
              <AttendanceCalendar
                isRtl={isRtl}
                calendarApi={calendarApi}
                toggleSidebar={toggleSidebar}
                calendarsColor={calendarsColor}
                setCalendarApi={setCalendarApi}
                handleAddEventSidebar={handleSidebarOpen}
              />
            )}
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      {activeFilter === 'Events' && (
        <AddEventSidebar
          store={store}
          dispatch={dispatch}
          addEvent={addEvent}
          open={addSidebarOpen}
          selectEvent={selectEvent}
          updateEvent={updateEvent}
          removeEvent={removeEvent}
          calendarApi={calendarApi}
          refetchEvents={refetchEvents}
          calendarsColor={calendarsColor}
          handleAddEventSidebar={handleSidebarOpen}
        />
      )}

      {activeFilter === 'Attendance' && (
        <AddClass openAddClass={addSidebarOpen} setOpenAddClass={handleSidebarOpen} />
      )}
    </Fragment>
  );
};

export default CalendarComponent;
