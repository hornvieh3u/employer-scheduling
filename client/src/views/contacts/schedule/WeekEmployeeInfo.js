import React from 'react';
import Avatar from '@components/avatar';
import { Move, User } from 'react-feather';

function WeekEmployeeInfo({ name }) {
  return (
    <div className="d-flex justify-content-start align-items-center employee-details">
      <div className="week-employee-drag-handler">
        <Move size={18} />
      </div>
      <Avatar color="success" icon={<User size={22} />} status="away" />
      <div className="d-flex flex-column">
        <div className="employee-name">
          <span>{name}</span>
        </div>
        <div>
          <span>$16 - 00</span>
        </div>
      </div>
    </div>
  );
}

export default WeekEmployeeInfo;
