import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import WeekCalender from './WeekCalender';
import DayCalendar from './DayCalendar';
import moment from 'moment';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  TabContent,
  TabPane,
  Card,
  InputGroup,
  Input
} from 'reactstrap';
import { ArrowLeftCircle, ArrowRight, ArrowRightCircle, Settings } from 'react-feather';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const EmployeeCalender = () => {
  const [weekdays, setWeekdays] = useState([]);
  const [weekPointers, setWeekPointers] = useState({ start: 0, end: 6 });
  const [active, setActive] = useState('week');

  const { groups, positions } = useSelector((state) => state.scheduleSetting);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const handlePreviousWeek = () => {
    let preWeekdays = [];
    for (let i = weekPointers.start - 7; i <= weekPointers.end - 7; i++) {
      preWeekdays.push(moment().day(i));
    }
    setWeekdays(preWeekdays);
    setWeekPointers({
      start: weekPointers.start - 7,
      end: weekPointers.end - 7
    });
  };

  const handleNextWeek = () => {
    let nextWeekdays = [];
    for (let i = weekPointers.start + 7; i <= weekPointers.end + 7; i++) {
      nextWeekdays.push(moment().day(i));
    }
    setWeekdays(nextWeekdays);
    setWeekPointers({
      start: weekPointers.start + 7,
      end: weekPointers.end + 7
    });
  };

  useEffect(() => {

    let currentWeekdays = [];
    for (let i = weekPointers.start; i <= weekPointers.end; i++) {
      currentWeekdays.push(moment().day(i));
    }
    setWeekdays(currentWeekdays);
  }, []);

  return (
    <Card>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center text-success" style={{ borderRadius: '5px', marginLeft: '10px' }}>
          <FaAngleLeft size={28} className="text-secondary" onClick={handlePreviousWeek} />
          <h5 className="p-1 text-secondary" style={{ marginTop: '10px', color: '#fff' }}>
            <span>{moment(weekdays[0]).format('MMM DD')}</span>
            <ArrowRight size={20} />
            <span>{moment(weekdays[6]).format('MMM DD, YYYY')}</span>
          </h5>
          <FaAngleRight size={28} className="text-secondary" onClick={handleNextWeek} />
        </div>
        <div className="d-flex m-1" role="group" aria-label="Basic example">
          <Button
            active={active === 'week'}
            onClick={() => {
              toggle('week');
            }}
            type="button"
            color="primary"
            outline
          >
            week
          </Button>
          <Button
            active={active === 'day'}
            onClick={() => {
              toggle('day');
            }}
            type="button"
            color="primary"
            outline
          >
            Day
          </Button>
          {/* <InputGroup style={{ width: '160px', height: '40px', marginLeft: '10px' }}>
            <Input type="select">
              <option>Employeer</option>
              <option>Employee</option>
            </Input>
          </InputGroup> */}
        </div>
      </div>
      <div>
        <div className="col-md-12 calenders">
          <TabContent className="py-0" activeTab={active}>
            <TabPane tabId="day">
              <DayCalendar />
            </TabPane>
            <TabPane tabId="week">
              <WeekCalender weekdays={weekdays} groups={groups.data} positions={positions.data} />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCalender;
