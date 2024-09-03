import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Edit, User } from 'react-feather';
import Avatar from '@components/avatar';
import { times } from './data';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import OpenShiftModal from './OpenShiftModal';

function DayEmployees() {
  const itemRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(-1);
  const [itemHeight, setItemHeight] = useState(-1);

  /* Open shift Modal */
  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);

  /* Open Shift Modal */
  const toggle = () => setOpen(!open);
  const handleSelectChange = ({ target: { value } }) => {
    setFocusAfterClose(JSON.parse(value));
  };

  useLayoutEffect(() => {
    // I don't think it can be null at this point, but better safe than sorry
    if (itemRef.current) {
      setItemWidth(window.getComputedStyle(itemRef.current).width);
      setItemHeight(window.getComputedStyle(itemRef.current).height);
    }
  });

  /* Daily time bar  */
  const daily_time_bar = (totalWidth, startTime, endTime, initTimeStart) => {
    let totalMin = 19 * 60; //Total Min
    let size_per_min = totalWidth / totalMin; // Size per minutes
    let diff_startTime = startTime - initTimeStart; //
    let diff_endTime = endTime - initTimeStart;
    let left = diff_startTime * size_per_min;
    let barwidth = diff_endTime * size_per_min - left;
    return { left, barwidth };
  };

  const { left, barwidth } = daily_time_bar(parseInt(itemWidth, 10), 630, 945, 420);

  return (
    <div className="d-flex flex-row">
      <div className="daily-row--title">
        <div className="d-flex  align-items-center daily-employee-details">
          <div>
            <Avatar color="success" icon={<User size={18} />} status="away" />
          </div>
          <div className="d-flex flex-column daily-employee-info">
            <div style={{ fontSize: '16px' }}>
              <span>James Redford</span>
            </div>
            <div>
              <span>4.00 - $ 48</span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row day-view-form" ref={itemRef}>
        {times.map((time) => (
          <div id={time} className="daily-row-cell">
            <div
              className="empty-cell-area empty-cell-area--plus-icon-hover"
              onClick={toggle}
            ></div>
          </div>
        ))}
        <div
          className="base-daily-shift base-daily-shift--draft"
          style={{
            left: `${left}px`,
            width: `${barwidth}px`,
            height: `${(parseInt(itemHeight) * 3) / 4}px`
          }}
        >
          <div className="base-day-shift__role">M</div>
          <div className="base-day-shift__details">
            <p class="base-day-shift__time" style={{ fontSize: barwidth < 150 ? '8px' : '12px' }}>10:30am - 15:45pm</p>
            <p class="base-day-shift__station"></p>
          </div>
          <div className="shift-status-icon">
            <Edit size={12} />
          </div>
        </div>
      </div>
      <Modal returnFocusAfterClose={focusAfterClose} isOpen={open} size="lg" centered>
        <ModalHeader toggle={toggle}>Add Shifts</ModalHeader>
        <ModalBody>
          <OpenShiftModal />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" size="sm" onClick={toggle}>
            Save
          </Button>
          <Button color="info" size="sm" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DayEmployees;
