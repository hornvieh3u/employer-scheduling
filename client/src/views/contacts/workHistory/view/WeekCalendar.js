import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import { Card, Input, FormGroup, Label } from 'reactstrap';

const data = [
  {
    id: 1,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 2,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 3,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 4,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 5,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 6,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 7,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 8,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  }
];

const WeekCalender = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [currentDate, setCurrentDate] = useState(moment());
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysInWeek = [];
    for (let i = 0; i < 7; i++) {
      daysInWeek.push(moment().add(i, 'days'));
    }
    setDays(daysInWeek);
  }, [currentDate]);

  const handlePageChange = (event) => {
    setSelectedPage(parseInt(event.target.value));
  };

  const indexOfLastPost = selectedPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const displayData = data.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Fragment>
      <Card>
        <div className="w-100 rounded">
          <table className="w-100 ">
            <thead>
              <tr>
                <th scope="col" className="cursor-pointer text-center">
                  <span>Status & Name</span>
                </th>
                <th scope="col" className="cursor-pointer text-center" style={{ width: '150px' }}>
                  <span>Time Tracked</span>
                </th>
                <th scope="col" className="cursor-pointer text-center">
                  <span>Time Start</span>
                </th>
                <th scope="col" className="cursor-pointer text-center">
                  <span>Time End</span>
                </th>
                {days.map((day) => (
                  <th
                    className="cursor-pointer text-center"
                    key={day.format('MMM DD')}
                    style={{ padding: '5px' }}
                  >
                    <span>
                      <b>{day.format('ddd')}</b>
                    </span>
                    <br />
                    <span style={{ fontWeight: '200' }}> {day.format('MMM DD')}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, i) => (
                <tr key={i}>
                  <th className="border cursor-pointer" style={{ width: '200px' }}>
                    <div className="d-flex p-1">
                      <img
                        src={img5}
                        className="rounded-circle me-2"
                        alt="Generic placeholder image"
                        height="40"
                        width="40"
                      />
                      <div className="ml-1 mt-1">
                        <h5 className="font-weight-bold">{item.name}</h5>
                      </div>
                    </div>
                  </th>
                  <th className="border cursor-pointer text-center">{item.tracker}m</th>
                  <th className="border cursor-pointer text-center">00.00</th>
                  <th className="border cursor-pointer text-center">00.00</th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                </tr>
              ))}
            </tbody>

            <FormGroup
              style={{
                width: '100px',
                position: 'absolute',
                right: '35px',
                display: 'flex',
                bottom: '0'
              }}
            >
              <Label for="pageSelect" style={{ marginTop: '8px' }}>
                Page:
              </Label>
              <Input
                type="select"
                name="pageSelect"
                id="pageSelect"
                value={selectedPage}
                onChange={handlePageChange}
              >
                {Array.from({ length: Math.ceil(data.length / postsPerPage) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </table>
        </div>
        <div className="d-flex p-1">
          <div className="d-flex p-1">
            <div style={{ background: '#27c26c', height: '20px', width: '20px' }}></div>
            <p style={{ marginLeft: '10px' }}>Computer Time</p>
          </div>
          <div className="d-flex p-1">
            <div style={{ background: '#f7b82f', height: '20px', width: '20px' }}></div>
            <p style={{ marginLeft: '10px' }}>Computer Time</p>
          </div>
          <div className="d-flex p-1">
            <div style={{ background: '#3c4ad9', height: '20px', width: '20px' }}></div>
            <p style={{ marginLeft: '10px' }}>Computer Time</p>
          </div>
          <div className="d-flex p-1">
            <div style={{ background: '#a4a7b2', height: '20px', width: '20px' }}></div>
            <p style={{ marginLeft: '10px' }}>Computer Time</p>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default WeekCalender;
