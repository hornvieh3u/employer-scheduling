import React, { useLayoutEffect, useRef, useState } from 'react';
import { Edit } from 'react-feather';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import OpenShiftModal from './OpenShiftModal';

function DayOpenShift({ times }) {
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
  useLayoutEffect(() => {
    // I don't think it can be null at this point, but better safe than sorry
    if (itemRef.current) {
      setItemWidth(window.getComputedStyle(itemRef.current).width);
      setItemHeight(window.getComputedStyle(itemRef.current).height);
    }
  });

  const { left, barwidth } = daily_time_bar(parseInt(itemWidth, 10), 510, 705, 420);
  return (
    <div className="d-flex flex-row open-shift-row">
      <div className="daily-row--title">
        <div className="d-flex justify-content-between align-items-center">
          <div className="open-shift-title">
            <span>Open Shift</span>
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
            <p class="base-day-shift__time" style={{ fontSize: barwidth < 150 ? '8px' : '12px' }}>
              8:30am - 11:45am
            </p>
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

export default DayOpenShift;
