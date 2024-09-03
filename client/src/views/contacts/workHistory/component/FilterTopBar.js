import React from 'react';
import { Card, Input } from 'reactstrap';
import moment from 'moment';
import DayCalendar from '../view/DayCalendar';
import WeekCalender from '../view/WeekCalendar';
import MonthCalender from '../view/MonthCalendar';

function FilterTopBar(props) {
  const { selectedValue, handleChangeEmployee, handleSelectChange, selectedFilter } = props;
  return (
    <Card>
      <div className="d-flex justify-content-between">
        <div className="p-1">
          {selectedValue === 'today' ? (
            <h4>{moment().format('ll')}</h4>
          ) : selectedValue === 'week' ? (
            <h4>Week Data</h4>
          ) : selectedValue === 'thismonth' ? (
            <h4>This Month Data</h4>
          ) : (
            <h4>Last Month Data</h4>
          )}
        </div>
        <div className="">
          <div className="d-flex p-1">
            <Input type="select" value={selectedFilter} onChange={handleChangeEmployee}>
              <option value={'remote'}>Remote</option>
              <option value={'inhouse'}>Inhouse</option>
              <option value={'all'}>All</option>
            </Input>
            <Input type="select" value={selectedValue} onChange={handleSelectChange}>
              <option value={'today'}>Today</option>
              <option value={'week'}>This Week</option>
              <option value={'thismonth'}>This Month</option>
              <option value={'lastmonth'}>Last Month</option>
            </Input>
          </div>
        </div>
      </div>

      {
        selectedValue === 'today' ? (
          <DayCalendar />
        ) : selectedValue === 'week' ? (
          <WeekCalender />
        ) : selectedValue === 'thismonth' ? (
          <MonthCalender />
        ) : (
          ''
        )
        //   (
        //     <LastMonthHistory />
        //   )
      }
    </Card>
  );
}

export default FilterTopBar;
