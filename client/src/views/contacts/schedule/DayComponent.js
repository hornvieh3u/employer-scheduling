import React from 'react';
import { Sun, User } from 'react-feather';
import { Button } from 'reactstrap';
import Avatar from '@components/avatar';

function DayComponent({ times }) {

  return (
    <div className="d-flex flex-row">
      <div className="daily-row--title">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Button size="sm" color="primary">
              Add Employee
            </Button>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              <div>
                <Sun size={25} />
              </div>
              <div className="d-flex align-items-center px-1">
                <span>25 °C</span>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <User size={12} />
              <span className="px-1">1</span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row day-view-form">
        {times.map((time) => (
          <div id={time} className="daily-row-cell">
            <div className="d-flex flex-column">
              <div>{time}</div>
              <div className="d-flex justify-content-center align-items-center">
                <User size={12} />
                <span>1</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayComponent;
