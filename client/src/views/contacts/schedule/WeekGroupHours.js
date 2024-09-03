import classNames from 'classnames';
import React from 'react';
import { Table } from 'reactstrap';

function WeekGroupHours({ weekDay, boh }) {
  return (
    <div className="d-flex group-labor-hours">
      <Table>
        <tbody>
          <tr className="d-flex group-labor-hours">
            <td
              className={classNames(
                'hours-title',
                boh == true ? 'hours-title-boh' : 'hours-title-foh'
              )}
            >
              <div className="d-flex justify-content-between  align-items-center">
                <div className="d-flex justify-content-between">
                  <div className="group-title-cell">
                    {boh == true ? <span>Back Of House</span> : <span>Front Of House</span>}
                  </div>
                  <div className="group-hours-cost">
                    <span>0 %</span>
                  </div>
                </div>
                <div className="d-flex flex-column" style={{ textAlign: 'end', fontSize: '12px' }}>
                  <div>
                    <span>0 hrs</span>
                  </div>
                  <div>
                    <span>$ 0.00</span>
                  </div>
                </div>
              </div>
            </td>
            {weekDay.map((week) => (
              <td
                key={week.id}
                className={classNames(
                  'hours-title-cell',
                  boh == true ? 'hours-title-cell-boh' : 'hours-title-cell-foh'
                )}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="group-hours-cost">
                    <span>0 %</span>
                  </div>
                  <div className="d-flex flex-column" style={{ textAlign: 'end', fontSize: '12px' }}>
                    <div>
                      <span>0 hrs</span>
                    </div>
                    <div>
                      <span>$ 0.00</span>
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

export default WeekGroupHours;
