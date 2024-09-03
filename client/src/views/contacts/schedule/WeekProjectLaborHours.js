import React from 'react';
import classNames from 'classnames';
import { Input } from 'reactstrap';

function WeekProjectLaborHours({ weekDay }) {
  return (
    <div className="d-flex flex-row">
      <div className="schedule-row-title weekly-header">
        <div className="d-flex align-items-center">
          <span style={{ color: 'black', fontWeight: '600' }}>Projected Labor Hours</span>
        </div>
      </div>
      {weekDay.map((week) => (
        <div key={week.id} className="schedule-row-cell">
          <div className={classNames('d-flex flex-column')}>
            <div className="d-inline  text-center projected-labor-hours">
              <Input
                className="projected-labor-hours-cell"
                type="number"
                bsSize="sm"
                min="0"
                max='99999'
                placeholder="0 %"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeekProjectLaborHours;
