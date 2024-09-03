// ** React Imports
import { useState, Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Input,
  ListGroup,
  ListGroupItem,
  Progress,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';

import { workingTaskListAction, workingTaskListPastDueAction } from './store/action';

import moment from 'moment';

// ** Icons Import
import { Search, MoreVertical } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

const PastDueClient = (props) => {
  const [active, setActive] = useState(false);

  const { setSelectedWorkingCheckList, activeTab } = props;

  const [tasks, setTasks] = useState([]);
  const { workingTaskList, workingTaskListPastDue } = useSelector((state) => state.tasks);

  const taskClickHandler = (task) => {
    setSelectedWorkingCheckList(task);
  };
  const dispatch = useDispatch();

  // Search Text
  const [text, setText] = useState('');
  const [sort, setSort] = useState('');

  // Past Due List
  const [pastDueTasks, setPastDueTasks] = useState([]);

  function formatPastDueData(data, searchText, sortVal) {
    let list = [];
    for (let task of data) {
      list.push(task);
    }

    if (searchText !== '') {
      list = list.filter(
        (x) => String(x.taskName).toLowerCase().indexOf(String(searchText).toLowerCase()) > -1
      );
    }

    // If Sort has value then sort data

    if (sortVal !== '') {
      if (sortVal === 'asc') {
        // accending sort
        list = list.sort((a, b) => String(a.taskName).localeCompare(b.taskName));
      }

      if (sortVal === 'desc') {
        // descending sort
        list = list.sort((a, b) => String(b.taskName).localeCompare(a.taskName));
      }

      if (sortVal === 'time') {
        // Date time sort
        list = list.sort((a, b) => {
          var c = new Date(a?.startDate);
          var d = new Date(b?.startDate);
          return c - d;
        });
      }
    }

    setTasks(list);
    // setPastDueTasks(list)
  }

  useMemo(() => {
    if (workingTaskListPastDue && workingTaskListPastDue?.list?.length > 0) {
      if (activeTab === 'past-due') {
        formatPastDueData(workingTaskListPastDue?.list, text, sort);
      }
    }
  }, [workingTaskListPastDue, activeTab, text, sort]);

  useMemo(() => {
    if (activeTab === 'past-due') {
      dispatch(workingTaskListPastDueAction());
    }
  }, [activeTab]);

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div>
          <div className="d-flex align-content-center justify-content-between w-100">
            <InputGroup className="input-group-merge border-0 shadow-none">
              <InputGroupText className="border-0">
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                className="border-0"
                placeholder="Search task"
                onChange={(e) => setText(e.target.value)}
                // value={query}
                // onChange={handleFilter}
              />
            </InputGroup>
          </div>
        </div>
        <div>
          <UncontrolledDropdown>
            <DropdownToggle
              className="hide-arrow me-1"
              tag="a"
              href="/"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical className="text-body" size={16} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag={Link}
                // to="/"
                // onClick={(e) => handleSort(e, 'title-asc')}
                onClick={(e) => setSort('asc')}
              >
                Sort A-Z
              </DropdownItem>
              <DropdownItem
                tag={Link}
                // to="/"
                // onClick={(e) => handleSort(e, 'title-desc')}
                onClick={(e) => setSort('desc')}
              >
                Sort Z-A
              </DropdownItem>
              <DropdownItem
                tag={Link}
                // to="/"
                // onClick={(e) => handleSort(e, 'assignee')}
                onClick={(e) => setSort('time')}
              >
                Short By Time
              </DropdownItem>
              <DropdownItem
                tag={Link}
                // to="/"
                // onClick={(e) => handleSort(e, '')}
                onClick={(e) => setSort('')}
              >
                Reset Sort
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>

      {pastDueTasks.length === 0 ? (
        <ListGroup>
          <ListGroupItem
            key={'empty-list'}
            tag="a"
            action
            className={active ? 'bg-primary' : 'bg-white'}
            style={{
              textAlign: 'center',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img style={{ width: '100px', height: '100px' }} src="/empty.svg" alt="" />
            <br />
            <span style={{ paddingLeft: 15 }}>Task is empty </span>
          </ListGroupItem>
        </ListGroup>
      ) : (
        <ListGroup tag="div">
          {pastDueTasks.map((task) => (
            <ListGroupItem
              key={task._id}
              tag="a"
              action
              onClick={() => taskClickHandler(task)}
              className={active ? 'bg-primary' : 'bg-white'}
            >
              <div className="d-flex justify-content-between w-100">
                <h5 className={active ? 'mb-1 text-white' : 'mb-1'}>{task?.taskName}</h5>
                <small className="text-secondary">
                  {activeTab === 'past-due' && moment(task?.schedule[0]?._date).format('L')}
                </small>
              </div>
              <div className="mb-1">
                <span className={active ? 'text-white' : 'text-black'}>
                  {moment(task?.startDate).format('h:mm a')} (In{' '}
                  {parseInt(moment.duration(moment(new Date()).diff(task?.startTime)).asHours())}{' '}
                  hour)
                </span>
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <span className={active ? 'text-white' : 'text-black'}>
                    {task?.schedule[0]?.checkList?.length}/{task?.checkList?.length}
                  </span>
                  <span className={active ? 'text-white' : 'text-black'}>
                    {isNaN(
                      parseFloat(
                        (task?.schedule[0]?.checkList?.length / task?.checkList?.length) * 100
                      ).toFixed(2)
                    )
                      ? '0.00'
                      : parseFloat(
                          (task?.schedule[0]?.checkList?.length / task?.checkList?.length) * 100
                        ).toFixed(2)}
                    %
                  </span>
                </div>
                <Progress
                  className={active ? 'progress-bar-success' : ''}
                  value={parseFloat(
                    (task?.schedule[0]?.checkList?.length / task?.checkList?.length) * 100
                  ).toFixed(2)}
                />
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </Fragment>
  );
};
export default PastDueClient;
