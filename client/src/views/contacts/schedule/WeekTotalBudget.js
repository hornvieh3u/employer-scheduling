import classNames from 'classnames';
import React from 'react';
import { Table } from 'reactstrap';

function WeekTotalBudget({ weekDay, active }) {
  console.log(active);
  return (
    <div className="d-flex">
      <Table className={classNames(active ? 'total-budget-row--table' : null)}>
        <tbody>
          <tr className="d-flex">
            <td className="total-budget-title">
              <div className="total-budget-title-row">
                <p className="budget-tool-content-title">Total</p>
                <div className="budget-tool-content-title--rate">12 %</div>
                <div className="d-flex flex-column" style={{ textAlign: 'end', fontSize: '12px' }}>
                  <div>
                    <span style={{ color: 'black', fontWeight: '400' }}>0 hrs</span>
                  </div>
                  <div>
                    <span style={{ color: 'black', fontWeight: '400' }}>$ 0.00</span>
                  </div>
                </div>
              </div>
            </td>
            {weekDay.map((week) => (
              <td key={week.id} className="total-budget-title-cell">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="budget-tool-content-title--rate">10 %</div>
                  <div className="d-flex flex-column" style={{ textAlign: 'end', fontSize: '12px' }}>
                    <div>
                      <span style={{ color: 'black', fontWeight: '400' }}>0 hrs</span>
                    </div>
                    <div>
                      <span style={{ color: 'black', fontWeight: '400' }}>$ 0.00</span>
                    </div>
                  </div>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default WeekTotalBudget;
