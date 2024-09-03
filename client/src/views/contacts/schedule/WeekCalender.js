import WeekComponent from './WeekComponent.js';
import { Button, Card, Collapse, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeekEvent from './WeekEvent.js';
import WeekGroup from './WeekGroup.js';
import WeekTotalBudget from './WeekTotalBudget.js';
import WeekProjectLaborHours from './WeekProjectLaborHours.js';
import WeekActualLaborHours from './WeekActualLaborHours.js';
import WeekGroupHours from './WeekGroupHours.js';
import moment from 'moment';
import { getSchedulesRequest } from '../settings/store/actions';
import { ArrowDownCircle, ArrowUpCircle, ChevronDown, ChevronUp } from 'react-feather';
import WeekSetting from './WeekSetting.js';

function WeekCalender(props) {
  const [isOpenBudgetTool, setIsOpenBudgetTool] = useState({ active: true, isOpen: false, item: 0 });
  const toggleBudget = (item) => {
    if (item == 1) {
      setIsOpenBudgetTool({ active: true, isOpen: !isOpenBudgetTool.isOpen, item: 1 });
      return;
    } else if (item == 2) {
      setIsOpenBudgetTool({ active: false, isOpen: !isOpenBudgetTool.isOpen, item: 2 });
      return;
    }
    setIsOpenBudgetTool({ ...isOpenBudgetTool, isOpen: !isOpenBudgetTool.isOpen });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSchedulesRequest({
        startDate: moment(props.weekdays[0]).format('YYYY-MM-DD'),
        endDate: moment(props.weekdays[6]).format('YYYY-MM-DD')
      })
    );
  }, [props.weekdays]);

  return (
    <Card style={{marginBottom: 0}}>
      <div className="employee-schedule-weekly">
        <div style={{padding: '0 15px'}}>
          <WeekComponent weekDay={props.weekdays} budget={false} />
          <WeekEvent weekDay={props.weekdays} />
          <WeekGroup weekDay={props.weekdays} groups={props.groups} positions={props.positions} />
          <div className="d-flex justify-content-between py-2">
            <div className="budget-tool">
              <span className={`budget-tool-btn ${ isOpenBudgetTool.item == 1 ? 'active' : '' }`} onClick={() => toggleBudget(1)}>
                Budget Tool 
              </span>
              <span className={`budget-setting-btn ${ isOpenBudgetTool.item == 2 ? 'active' : '' }`} onClick={() => toggleBudget(2)}>
                Setting
              </span>
            </div>
            <div>
              <span className="total-collapse" onClick={() => toggleBudget(3)} style={{cursor: 'pointer'}}>
                {isOpenBudgetTool.isOpen ? (
                  <ChevronDown size={32} />
                ) : (
                  <ChevronUp size={32} />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="projection-actual-panel">
          {isOpenBudgetTool.active ? (
            <Fragment>
              <WeekComponent weekDay={props.weekdays} budget={true} />
              <WeekTotalBudget weekDay={props.weekdays} active={!isOpenBudgetTool.isOpen} />
            </Fragment>
          ) : (
            <span>Setting Title</span>
          )}
          {isOpenBudgetTool.active ? (
            <Collapse isOpen={isOpenBudgetTool.isOpen}>
              <WeekProjectLaborHours weekDay={props.weekdays} />
              <WeekActualLaborHours weekDay={props.weekdays} />
              <WeekGroupHours weekDay={props.weekdays} boh={true} />
              <WeekGroupHours weekDay={props.weekdays} boh={false} />
            </Collapse>
          ) : (
            <Collapse isOpen={isOpenBudgetTool.isOpen}>
              <span>Setting Page</span>
            </Collapse>
          )}
        </div>
      </div>
    </Card>
  );
}

export default WeekCalender;
