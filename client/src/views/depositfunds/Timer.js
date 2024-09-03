import React, { useState, useEffect, useRef } from 'react';

import moment from 'moment';

export default function TimerCountDown({ ciTime, current_time }) {
  let interval = useRef();
  const [countTime, setCountDateTime] = useState({
    time_days: 0,
    time_Hours: 0,
    time_Minusts: 0,
    time_seconds: 0
  });

  const startTime = async (time) => {
    interval = setInterval(() => {
      var jun = moment().format('x');

      //  let a = jun.tz("Europe/Belgrade").format("x");
      const distance = +jun - +ciTime;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minuts = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setCountDateTime({
          ...countTime,
          time_days: days,
          time_Hours: hours,
          time_Minusts: minuts,
          time_seconds: seconds
        });
      }
    }, 1000);
  };
  useEffect(() => {
    if (ciTime) {
      startTime(ciTime);
    }
  }, [ciTime]);

  return (
    <div>
      {countTime.time_days}d {countTime.time_Hours}h {countTime.time_Minusts}m{' '}
      {countTime.time_seconds}s
    </div>
  );
}
