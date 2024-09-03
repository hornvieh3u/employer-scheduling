import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Input, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { addShiftsToScheduleRequest } from '../settings/store/actions';

function OpenShiftModal({ isOpen, returnFocusAfterClose, toggle, shiftDate, shiftGroupId, shiftEmployeeId, weekDay }) {
  const [shiftStartTime, setShiftStartTime] = useState('09:00');
  const [shiftEndTime, setShiftEndTime] = useState('17:00');
  const [shiftTitle, setShiftTitle] = useState('');
  const [shiftNote, setShiftNote] = useState('');

  const [selectedDate, setSelectedDate] = useState([]);

  const dispatch = useDispatch();

  const createShift = () => {
    dispatch( addShiftsToScheduleRequest(
      {
        dates: selectedDate,
        shiftGroupId,
        shiftEmployeeId,
        shiftStartTime,
        shiftEndTime,
        shiftTitle,
        shiftNote
      },
      {
        startDate: moment(weekDay[0]).format("YYYY-MM-DD"),
        endDate: moment(weekDay[6]).format("YYYY-MM-DD")
      }
    ));

    toggle();
  }

  useEffect(()=>{
    setSelectedDate([shiftDate]);
  },[shiftDate]);

  const setSelectedDates = date => {
    if( selectedDate.includes(date) ) {
      setSelectedDate(selectedDate.filter(item => item != date));
    } else {
      setSelectedDate([...selectedDate, date]);
    }
  }
  
  return (
    <Modal isOpen={isOpen} size="lg" centered>
      <ModalHeader toggle={toggle}>Add Shifts</ModalHeader>
      <ModalBody>
        <div className="weekly-add-shift-modal" style={{ padding: '10px' }}>
          <span>Shift Title</span>
          <Input type="text" bsSize="sm" value={shiftTitle}  onChange={e => setShiftTitle(e.target.value)} placeholder="Please input the title."/>
          <div className="d-flex justify-content-between align-items-center py-1">
            <Input type="time" bsSize="sm" value={shiftStartTime} onChange={e => setShiftStartTime(e.target.value)} />
            <ArrowRight bsSize={36} />
            <Input type="time" bsSize="sm" value={shiftEndTime}  onChange={e => setShiftEndTime(e.target.value)} />
            <Input id="closedBox" name="closedbox" type="checkbox" style={{ width: '50px' }} />
            <span>CLOSED</span>
            <Input id="bdBox" name="bdbox" type="checkbox" style={{ width: '50px' }} />
            <span>BD</span>
          </div>
          <div className="d-flex flex-column">
            <span>Apply to</span>
            <div className="d-flex justify-content-between">
              {weekDay.map((date, index) => (
                <div
                  id={index}
                  className={classNames(
                    'weekly-day',
                    selectedDate.includes( moment(date).format('YYYY-MM-DD') ) ? 'weekly-day-selected' : null
                  )}
                  onClick={() => setSelectedDates(moment(date).format('YYYY-MM-DD'))}
                >
                  <span>{moment(date).format("ddd")}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column" style={{ paddingTop: '5px' }}>
            <span>Shift Notes</span>
            <Input id="shiftsNotes" name="shiftNotes" type="textarea" value={shiftNote} onChange={e => setShiftNote( e.target.value )}/>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" size="sm" onClick={createShift}>
          Save
        </Button>
        <Button color="info" size="sm" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default OpenShiftModal;
