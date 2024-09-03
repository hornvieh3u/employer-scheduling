import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Sun, User } from 'react-feather';
import moment from 'moment';
import axios from 'axios';

function WeekDay({ date, name, day, budget }) {
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState(0);

  /*Get Weather Information */
  const getWeather = (data) => {
    if (compare_date(data) < 0) {
      axios
        .get(
          `https://api.weatherapi.com/v1/forecast.json?key=f03b03960f7d4a33948172654232402&q=10001&days=6`
        )
        .then((response) => {
          for (let i = 0; i < response.data.forecast.forecastday.length; i++) {
            if (response.data.forecast.forecastday[i].date == data) {
              setWeather(response.data.forecast.forecastday[i].day.condition.icon);
              setTemperature(response.data.forecast.forecastday[i].day.avgtemp_c);
              return;
            } else {
              setWeather('');
              setTemperature(0);
            }
          }
        })
        .catch((err) => {
          setWeather('');
          setTemperature(0);
        });
      return;
    } else if (compare_date(data) > 15) {
      setWeather('');
      setTemperature(0);
      return;
    } else {
      axios
        .get(
          `https://api.weatherapi.com/v1/history.json?key=f03b03960f7d4a33948172654232402&q=10001&dt=${data}`
        )
        .then((response) => {
          setWeather(response.data.forecast.forecastday[0].day.condition.icon);
          setTemperature(response.data.forecast.forecastday[0].day.avgtemp_c);
        })
        .catch((err) => {
          setWeather('');
          setTemperature(0);
        });
      return;
    }
  };

  //Diff date
  const compare_date = (b) => {
    let current = moment(new Date()).format('YYYY-MM-DD');
    let diff_date = moment(current).diff(b, 'days'); // 1
    return diff_date;
  };

  useEffect(() => {
    getWeather(date);
  }, [date]);
  return (
    <div className="d-flex flex-column" style={{ padding: '2px' }}>
      {budget == true ? (
        <>
          <div className={classNames('d-flex flex-column')}>
            <div className="d-inline text-center">
              <h5 style={{ color: 'black' }}>{name}</h5>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={classNames(
              'd-flex flex-column',
              name == moment().format('MMM DD') ? 'weekday-header' : null
            )}
          >
            <div className="d-inline  text-center" style={{ fontWeight: '600', fontSize: '24px' }}>
              <span>{name}</span>
            </div>
            <div className="d-inline text-center" style={{ fontSize: '18px'}}>
              <span>{day}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div>{weather ? <img src={weather} width="30px" height="30px" /> : null}</div>
              <div style={{ paddingLeft: '6px' }}>
                <span>{temperature != 0 ? <span>{temperature}</span> : 0} °C</span>
              </div>
            </div>
            <div className="d-flex align-items-center employees">
              <User size={18} />
              <span>1</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WeekDay;
