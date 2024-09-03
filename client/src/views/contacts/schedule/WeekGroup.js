import classNames from 'classnames';
import moment from 'moment';
import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit } from 'react-feather';
import WeekEmployeeInfo from './WeekEmployeeInfo';
import OpenShiftModal from './OpenShiftModal';
import { updateEmployeePositionRequest, updateShiftScheduleRequest } from '../settings/store/actions';

function WeekGroup({ weekDay, groups, positions }) {
  /* Open shift Modal */
  const [open, setOpen] = useState(false);

  /* Drag and Drop */
  const [dragElement, setDragElement] = useState(null);
  const [dropElement, setDropElement] = useState(null);

  const [shiftDate, setShiftDate] = useState('');
  const [shiftGroupId, setShiftGroupId] = useState('');
  const [shiftEmployeeId, setShiftEmployeeId] = useState('');

  const dispatch = useDispatch();

  /* Open Shift Modal */
  const toggle = () => setOpen(!open);

  const showCreateOpenShiftModal = (date, groupId) => {
    setShiftDate(date);
    setShiftGroupId(groupId);
    setShiftEmployeeId('');

    toggle();
  }

  const showCreateEmployeeShiftModal = (date, employeeId) => {
    setShiftDate(date);
    setShiftGroupId('');
    setShiftEmployeeId(employeeId);

    toggle();
  }

  const collectionHas = (a, b) => {
    //helper function (see below)
    for (var i = 0, len = a.length; i < len; i++) {
      if (a[i] == b) return true;
    }
    return false;
  };
  const findParentBySelector = (elm, selector) => {
    var all = document.querySelectorAll(selector);
    var cur = elm.parentNode;
    while (cur && !collectionHas(all, cur)) {
      //keep going up until you find a match
      cur = cur.parentNode; //go up
    }
    return cur; //will return null if not found
  };

  const allowDrop = (event) => {
    if (
      dragElement.target.className.includes('schedule-time') &&
      event.target.className.includes('empty-cell-area')
    )
      event.preventDefault();

    const dropTarget = findParentBySelector(event.target, '.employee-positions');
    if (dragElement.target.className.includes('employee') && dropTarget) {
      event.preventDefault();
      setDropElement(dropTarget);
    }
  };

  const drop = (event) => {
    event.preventDefault();
    if (dragElement.target.className.includes('employee')) {
      dropElement.lastChild.insertAdjacentElement('beforebegin', dragElement.target);
      dispatch(updateEmployeePositionRequest({
        employeeId: dragElement.target.dataset.employeeid,
        position: dropElement.dataset.position
      }))
    } else if (dragElement.target.className.includes('schedule-time')) {
      dispatch(updateShiftScheduleRequest({
        id: dragElement.target.dataset.scheduleid,
        shiftId: dragElement.target.dataset.shiftid,
        date: event.target.parentElement.dataset.date,
        groupId: event.target.parentElement.dataset?.groupid,
        employeeId: event.target.parentElement.dataset?.employeeid
      }))

      event.target.insertAdjacentElement('beforebegin', dragElement.target);
    }
  };

  const { shiftsInSchedule, employeesInSchedule } = useSelector((state) => state.scheduleSetting.schedules);

  return (
    <>
      {groups.map((group) => (
        <Fragment key={group._id}>
          <div
            className={classNames(
              'd-flex employee-group',
              group.id == 1 ? 'employee-group-boh' : 'employee-group-foh'
            )}
          >
            <span>{group.name}</span>
          </div>
          <div className="d-flex flex-row schedule-row-title-open-shift">
            <div className="schedule-row-title ">
              <div className="open-shift">
                <span className="open-shift-title">Open Shift</span>
              </div>
            </div>
            {weekDay.map((date, index) => (
              <div
                key={index}
                data-date={moment(date).format('YYYY-MM-DD')}
                className="d-flex flex-column schedule-row-cell"
                onDragOver={(event) => allowDrop(event)}
                onDrop={(event) => drop(event)}
                data-groupid={group._id}
              >
                {
                  shiftsInSchedule.map(shiftInSchedule => {
                    if (
                      !shiftInSchedule.employeeId &&
                      shiftInSchedule.date == moment(date).format('YYYY-MM-DD') &&
                      shiftInSchedule.groupId == group._id
                    ) {
                      return (
                        <div
                          className="d-flex flex-row schedule-time"
                          draggable={true}
                          onDragStart={(event) => setDragElement(event)}
                          data-shiftid={shiftInSchedule.shiftId}
                          data-scheduleid={shiftInSchedule._id}
                        >
                          <div className="base-shift-position"></div>
                          <div className="base-shift-details">
                            <span>
                              {moment(`${shiftInSchedule.date} ${shiftInSchedule.shift[0].startTime}`).format("hh:mm A")} ~ {moment(`${shiftInSchedule.date} ${shiftInSchedule.shift[0].endTime}`).format("hh:mm A")}
                            </span>
                          </div>
                          <div className="base-shift-icons">
                            <Edit size={10} />
                          </div>
                        </div>
                      )
                    }
                  })
                }
                <div
                  className="empty-cell-area empty-cell-area--plus-icon-hover"
                  onClick={() => showCreateOpenShiftModal(moment(date).format('YYYY-MM-DD'), group._id)}
                ></div>
              </div>
            ))}
          </div>
          {group.positions.map((position, index) => {
            return (
              <Fragment>
                <div
                  className="employee-positions"
                  key={index}
                  onDragOver={(event) => allowDrop(event)}
                  onDrop={(event) => drop(event)}
                  data-position={position.name}
                >
                  <div
                    className={classNames('d-flex employee-position', 'text-white')}
                    style={{ backgroundColor: `${position.color}`, padding: '3px 10px' }}
                  >
                    {position.name}
                  </div>
                  {employeesInSchedule?.map((employeeInSchedule) => {
                    if (employeeInSchedule.employee[0]?.position == position.name) {
                      return (
                        <div
                          className="d-flex flex-row employee"
                          draggable={true}
                          onDragStart={(event) => setDragElement(event)}
                          data-employeeid={employeeInSchedule.employee[0]?._id}
                        >
                          <div className="schedule-row-title">
                            <div className="employee-info">
                              <WeekEmployeeInfo name={ employeeInSchedule.employee[0].fullName } />
                            </div>
                          </div>
                          {weekDay.map((date, index) => (
                            <div
                              key={index}
                              data-date={moment(date).format('YYYY-MM-DD')}
                              className="d-flex flex-column schedule-row-cell"
                              onDragOver={(event) => allowDrop(event)}
                              onDrop={(event) => drop(event)}
                              data-employeeid={employeeInSchedule.employee[0]?._id}
                            >
                              {
                                shiftsInSchedule.map(shiftInSchedule => {
                                  if (
                                    shiftInSchedule.date == moment(date).format('YYYY-MM-DD') &&
                                    shiftInSchedule.employeeId == employeeInSchedule.employee[0]._id
                                  ) {
                                    return (
                                      <div
                                        className="d-flex flex-row schedule-time"
                                        draggable={true}
                                        onDragStart={(event) => setDragElement(event)}
                                        data-shiftid={shiftInSchedule.shiftId}
                                        data-scheduleid={shiftInSchedule._id}
                                      >
                                        <div className="base-shift-position"></div>
                                        <div className="base-shift-details">
                                          <span>
                                            {moment(`${shiftInSchedule.date} ${shiftInSchedule.shift[0].startTime}`).format("hh:mm A")} ~ {moment(`${shiftInSchedule.date} ${shiftInSchedule.shift[0].endTime}`).format("hh:mm A")}
                                          </span>
                                        </div>
                                        <div className="base-shift-icons">
                                          <Edit size={10} />
                                        </div>
                                      </div>
                                    )
                                  }
                                })
                              }
                              <div className="empty-cell-area empty-cell-area--plus-icon-hover" onClick={() => showCreateEmployeeShiftModal(moment(date).format('YYYY-MM-DD'), employeeInSchedule.employee[0]._id)}></div>
                            </div>
                          ))}
                        </div>
                      );
                    }
                  })}
                  <div className="schedule-row-cell list-by-role__no-employee">
                    <p>To appear under this role, click &amp; drag the employee here.</p>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </Fragment>
      ))}
      <OpenShiftModal
        isOpen={open}
        toggle={toggle}
        shiftDate={shiftDate}
        shiftGroupId={shiftGroupId}
        shiftEmployeeId={shiftEmployeeId}
        weekDay={weekDay}
      />
    </>
  );
}

export default WeekGroup;
