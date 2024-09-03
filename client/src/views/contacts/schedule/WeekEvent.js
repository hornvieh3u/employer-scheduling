import React from "react";

function WeekEvent({ weekDay }) {
  return (
    <div className="d-flex flex-row weekly-event-view">
      <div className="schedule-row-title">
        <div className="event-row px-1">
          <h5 className="text-primary">Event</h5>
        </div>
      </div>
      <div className="schedule-row-cell"></div>
    </div>
  );
}

export default WeekEvent;
