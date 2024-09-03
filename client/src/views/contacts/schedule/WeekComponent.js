import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addEmployeesToScheduleRequest } from '../settings/store/actions';
import EmployeeAssignment from './EmployeeAssignment';
import WeekDay from './WeekDay';

function WeekComponent({ weekDay, budget }) {
  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);

  const dispatch = useDispatch();

  const toggle = () => setOpen(!open);
  const handleSelectChange = ({ target: { value } }) => {
    setFocusAfterClose(JSON.parse(value));
  };

  const selectEmployee = ({selectedRows}) => {
    let ids = [];
    selectedRows.forEach( row => {
      ids.push( row._id );
    })

    setSelectedEmployeeIds( ids );
  }

  const addEmployeesToSchedule = () => {
    dispatch(addEmployeesToScheduleRequest(selectedEmployeeIds, {
      startDate: moment(weekDay[0]).format("YYYY-MM-DD"),
      endDate: moment(weekDay[6]).format("YYYY-MM-DD")
    }));

    toggle();
  }

  return (
    <div className="d-flex flex-row">
      <div className="schedule-row-title weekly-header">
        <div className="d-flex justify-content-center align-items-center add-employee">
          {budget == true ? (
            <span style={{ color: 'black', fontWeight: '600' }}>Projection - Actuals</span>
          ) : (
            <Button color="primary" size="md" onClick={toggle}>
              Add Employee
            </Button>
          )}
        </div>
      </div>
      {weekDay.map((date, index) => (
        <div key={index} className="schedule-row-cell">
          <WeekDay
            date={moment(date).format('YYYY-MM-DD')}
            name={moment(date).format('MMM DD')}
            day={moment(date).format('ddd')}
            budget={budget}
          />
        </div>
      ))}
      <Modal returnFocusAfterClose={focusAfterClose} isOpen={open} size="lg">
        <ModalHeader toggle={toggle}>Employee Assignment</ModalHeader>
        <ModalBody>
          <EmployeeAssignment selectEmployee={selectEmployee} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" size="sm" onClick={addEmployeesToSchedule}>
            Add
          </Button>
          <Button color="info" size="sm" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default WeekComponent;
