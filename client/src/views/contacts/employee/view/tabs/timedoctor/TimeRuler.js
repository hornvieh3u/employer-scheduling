import React from 'react';

import classes from './styles.module.css';

const TimeRuler = (props) => {
  const { timeLineData } = props;
  return (
    <div className={classes.container}>
      <div className={classes.timeline}>
        <div className={classes.fullDividerWrapper}>
          {Array.apply(null, Array(13)).map((value, index) => {
            let displayTime = '';
            if (index === 0) displayTime = '';
            else if (index < 6) displayTime = `${index * 2}AM`;
            else if (index == 6) displayTime = '12PM';
            else if (index > 6) displayTime = `${(index - 6) * 2}PM`;
            if (index === 12) displayTime = '';
            return (
              <div className={classes.fullDivider} style={{ left: `calc(95%/12*${index})` }}>
                <p className={classes.fullDividerText}>{displayTime}</p>
              </div>
            );
          })}
        </div>
        <div className={classes.fullDividerWrapper}>
          {Array.apply(null, Array(12)).map((value, index) => {
            return (
              <div
                className={classes.halfDivider}
                style={{ left: `calc(95%/24*${2 * index + 1})` }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className={classes.trackedTimeWrapper}>
        {timeLineData.map((data) => {
          const startDiff = data.start.getHours() * 60 + data.start.getMinutes();
          const duration =
            data.end.getHours() * 60 +
            data.end.getMinutes() -
            data.start.getHours() * 60 -
            data.start.getMinutes();
          return (
            <div
              style={{
                position: 'absolute',
                left: `calc(95%*${startDiff}/1440)`,
                width: `calc(95%*${duration}/1440)`,
                height: '40px',
                backgroundColor: '#27c26c'
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeRuler;
