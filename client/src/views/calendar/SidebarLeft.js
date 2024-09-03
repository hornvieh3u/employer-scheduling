// ** React Imports
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import classnames from 'classnames';

// ** Icons Import
import { MdOutlineEventAvailable } from 'react-icons/md';

// ** Reactstrap Imports
import { CardBody, Button, Input, Label } from 'reactstrap';

// ** illustration import
import illustration from '@src/assets/images/pages/calendar-illustration.png';
import AddAppointment from './appointment/AddAppSidebar';
import ViewAttendance from './attendance/ViewAttendance';
import AddClass from './attendance/AddClass';
import ViewAppointment from './appointment/ViewAppointment';
import { selectClass } from './attendance/store';

// ** Filters Checkbox Array
const filters = [
  { label: 'Events', color: 'danger', className: 'form-check-primary mb-1' },
  {
    label: 'Appointments',
    color: 'danger',
    className: 'form-check-primary mb-1'
  },
  { label: 'Personal', color: 'danger', className: 'form-check-danger mb-1' },
  {
    label: 'Business',
    color: 'primary',
    className: 'form-check-primary mb-1'
  },
  { label: 'Family', color: 'warning', className: 'form-check-warning mb-1' },
  {
    label: 'Holiday',
    color: 'success',
    className: 'form-check-success mb-1'
  },
  { label: 'ETC', color: 'info', className: 'form-check-info' }
];

const SidebarLeft = (props) => {
  // ** Props
  // console.log(activeFilter)
  const [addAppointmentSidebarOpen, setAddAppointmentSidebarOpen] = useState(false);
  const [openAddClass, setOpenAddClass] = useState(false);
  const [viewAttendanceOpen, setViewAttendanceOpen] = useState(false);
  const [openViewAppointment, setOpenViewAppointment] = useState(false);

  const {
    filtersRadio,
    setActiveFilter,
    activeFilter,
    handleSidebarOpen,
    toggleSidebar,
    updateFilter,
    updateAllFilters,
    store,
    dispatch
  } = props;

  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar(false);
    handleSidebarOpen();
  };

  // ** Function to handle Add Appointment Click
  const handleAddAppointmentClick = () => {
    toggleSidebar(false);
  };

  return (
    <Fragment>
      <div className="sidebar-wrapper">
        {activeFilter === 'Events' ? (
          <CardBody className="card-body">
            <Link to="/add-event">
              <Button color="primary" outline block className="mb-1">
                <span className="align-middle">+ Add Event</span>
              </Button>
            </Link>
            <Link to="/events">
              <Button color="primary" outline block onClick={handleAddAppointmentClick}>
                <span className="align-middle">View Events</span>
              </Button>
            </Link>
          </CardBody>
        ) : activeFilter === 'Appointments' ? (
          <CardBody className="card-body">
            <Button
              color="primary"
              outline
              block
              onClick={() => setAddAppointmentSidebarOpen(true)}
              className="mb-1"
            >
              <span className="align-middle">+ Add Appointment</span>
            </Button>
            <Button color="primary" outline block onClick={() => setOpenViewAppointment(true)}>
              <span className="align-middle">View Appointment</span>
            </Button>
          </CardBody>
        ) : activeFilter === 'Booking' ? (
          <CardBody className="card-body">
            <Link to="/book/booking-type">
              <Button color="primary" outline block className="mb-1">
                <span className="align-middle">Create Booking</span>
              </Button>
            </Link>

            <Link to="/book/">
              <Button
                color="primary"
                outline
                block
              // onClick={handleAddAppointmentClick}
              >
                <span className="align-middle">View Bookings</span>
              </Button>
            </Link>
          </CardBody>
        ) : (
          <CardBody className="card-body">
            <Button
              color="primary"
              outline
              block
              className="mb-1"
              onClick={() => {
                setOpenAddClass(true);
                dispatch(selectClass({}));
              }}
            >
              <span className="align-middle">Setting</span>
            </Button>
            <Button color="primary" outline block onClick={() => setViewAttendanceOpen(true)}>
              <span className="align-middle">View Attendance</span>
            </Button>
          </CardBody>
        )}
        <CardBody>
          <h5 className="section-label mb-1">
            <span className="align-middle">Filter</span>
          </h5>

          <div className="list-unstyled calendar-events-filter">
            {filtersRadio.map((filter) => {
              return (
                <li className="mb-1" key={filter.id}>
                  <div className="form-check">
                    <Input
                      type="radio"
                      id={filter.id}
                      value={filter.id}
                      name="category-radio"
                      onClick={() => setActiveFilter(filter.label)}
                      defaultChecked={filter.label === activeFilter}
                    />
                    <Label className="form-check-label" for={filter.id}>
                      {filter.label}
                    </Label>
                  </div>
                </li>
              );
            })}
          </div>
          <h5 className="section-label mb-1 mt-2">
            <span className="align-middle">Filter</span>
          </h5>
          <div className="form-check mb-1">
            <Input
              id="view-all"
              type="checkbox"
              label="View All"
              className="select-all"
              checked={store.selectedCalendars.length === filters.length}
              onChange={(e) => dispatch(updateAllFilters(e.target.checked))}
            />
            <Label className="form-check-label" for="view-all">
              View All
            </Label>
          </div>
          <div className="calendar-events-filter">
            {filters.length &&
              filters.map((filter) => {
                return (
                  <div
                    key={`${filter.label}-key`}
                    className={classnames('form-check', {
                      [filter.className]: filter.className
                    })}
                  >
                    <Input
                      type="checkbox"
                      key={filter.label}
                      label={filter.label}
                      className="input-filter"
                      id={`${filter.label}-event`}
                      checked={store.selectedCalendars.includes(filter.label)}
                      onChange={() => {
                        dispatch(updateFilter(filter.label));
                      }}
                    />
                    <Label className="form-check-label" for={`${filter.label}-event`}>
                      {filter.label}
                    </Label>
                  </div>
                );
              })}
          </div>
        </CardBody>
      </div>
      <div className="mt-auto">
        <img className="img-fluid" src={illustration} alt="illustration" />
      </div>
      <ViewAppointment
        setOpenViewAppointment={setOpenViewAppointment}
        openViewAppointment={openViewAppointment}
      />
      <AddAppointment
        addAppointmentSidebarOpen={addAppointmentSidebarOpen}
        setAddAppointmentSidebarOpen={setAddAppointmentSidebarOpen}
      />
      <ViewAttendance
        viewAttendanceOpen={viewAttendanceOpen}
        setViewAttendanceOpen={setViewAttendanceOpen}
      />
      <AddClass openAddClass={openAddClass} setOpenAddClass={setOpenAddClass} />
    </Fragment>
  );
};

export default SidebarLeft;
