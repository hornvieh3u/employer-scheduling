import classNames from 'classnames';
import React, { Fragment } from 'react';
import { times } from './data';
import DayEmployees from './DayEmployees';
import DayOpenShift from './DayOpenShift';

function DayGroup({ groups, positions }) {
  return (
    <Fragment>
      {groups.map((group) => (
        <div key={group.id}>
          <div className="daily-group">
            <span>{group.title}</span>
          </div>
          <DayOpenShift times={times} />
          {positions.map((position) => (
            <Fragment>
              {group.id == position.groupId ? (
                <>
                  <div className={classNames('daily-position', `daily-position-${position.id}`)}>
                    <span>{position.title ? position.title : 'No Role'}</span>
                  </div>
                  {position.employeeId ? (
                    <DayEmployees />
                  ) : (
                    <div className="list-by-role__no-employee">
                      <p>To appear under this role, click &amp; drag the employee here.</p>
                    </div>
                  )}
                </>
              ) : null}
            </Fragment>
          ))}
        </div>
      ))}
    </Fragment>
  );
}

export default DayGroup;
