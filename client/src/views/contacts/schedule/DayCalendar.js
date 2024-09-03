import { useState } from 'react';
import { Card } from 'reactstrap';
import { groups, positions, times } from './data.js';
import DayComponent from './DayComponent.js';
import DayEvent from './DayEvent.js';
import DayGroup from './DayGroup.js';
import DayLaborCost from './DayLaborCost.js';

function DayCalendar() {
  return (
    <Card>
      <div className="employee-schedule-daily">
        {/* Day Times  */}
        <DayComponent times={times} />
        {/* Day Event */}
        <DayEvent />
        {/* Day Group */}
        <DayGroup groups={groups} positions={positions} />
        {/* Day Labor Cost */}
        <DayLaborCost />
      </div>
    </Card>
  );
}

export default DayCalendar;
