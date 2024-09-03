import React from 'react';
import { times } from './data';

function DayLaborCost() {
  return (
    <div className="d-flex flex-row daily-labor-cost">
      <div className="daily-row--title">
        <div className="d-flex justify-content-between align-items-center labor-cost-title">
          <div className="daily-labor-cost-percent">
            <span>8.5 %</span>
          </div>
          <div className="d-flex flex-column daily-labor-actual">
            <div>
              <span>10 Hrs</span>
            </div>
            <div>
              <span>$ 500</span>
            </div>
          </div>
        </div>
      </div>
      {times.map((time) => (
        <div id={time} className="daily-row-cell">
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column daily-labor-cell-cost">
              <div>
                <span>2 Hrs</span>
              </div>
              <div>
                <span>$ 50</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DayLaborCost;
