import React from 'react';

function DayEvent() {
  return (
    <div className="d-flex flex-row">
      <div className="daily-row--title event-row">
        <div className="d-flex justify-content-between align-items-center">
          <div className="event-title">
            <span>Event</span>
          </div>
        </div>
      </div>
      <div className="daily-row-cell"></div>
    </div>
  );
}

export default DayEvent;
