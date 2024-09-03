import React, { Fragment } from 'react';

function BudgetTool({ weekDay }) {
  const weekDayRow = weekDay.map((week) => {
    return (
      <div
        key={week.id}
        className="d-flex justify-content-center align-items-center budget-weekday"
      >
        <h5 className="text-black">{week.name}</h5>
      </div>
    );
  });
  return (
    <Fragment>
      <div className="cell-title projection-actuals-cell">
        <h5 className="text-black">Projections & Actuals</h5>
      </div>
      {weekDayRow}
    </Fragment>
  );
}

export default BudgetTool;
