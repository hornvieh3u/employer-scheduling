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

const CheckLists = (props) => {
  const [active, setActive] = useState(false);
  const [selectedWorkingTask, setSelectedWorkingTask] = useState(null);

  const { setSelectedWorkingCheckList, activeTab } = props;

  const [tasks, setTasks] = useState([]);
  const { workingTaskList, workingTaskListPastDue } = useSelector((state) => state.tasks);

  const taskClickHandler = (task) => {
    setSelectedWorkingCheckList(task);
    setSelectedWorkingTask(task);
  };
  const dispatch = useDispatch();

  // Search Text
  const [text, setText] = useState('');
  const [sort, setSort] = useState('');

  function formatData(data, searchText, sortVal) {
    let list = [];
    for (let task of data) {
      if (activeTab === 'completed') {
        const checkListLength = task?.checkList?.length;
        const completedTodosLen = task?.schedule[0]?.checkList?.length;
        if (checkListLength === completedTodosLen || completedTodosLen > checkListLength) {
          list.push(task);
        }
      } else if (activeTab === 'today') {
        // Push All todays Task
        list = list.filter((x) => x?.checkList?.length !== x?.schedule[0]?.checkList?.length);

        list.push(task);
      }
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

    list = list.filter((x) => x?.checkList?.length > 0);

    setTasks(list);
  }

  useMemo(() => {
    if (workingTaskList && workingTaskList?.list?.length > 0) {
      if (activeTab !== 'past-due') {
        formatData(workingTaskList?.list, text, sort);
      }
    }
  }, [workingTaskList, activeTab, text, sort]);

  useMemo(() => {
    dispatch(workingTaskListAction());
  }, [dispatch]);

  useMemo(() => {
    if (activeTab === 'past-due') {
      dispatch(workingTaskListPastDueAction());
    }
  }, [activeTab]);

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div style={{ width: '100%' }}>
          <div className="d-flex align-content-center justify-content-between w-100">
            <InputGroup className="input-group-merge border-0 shadow-none">
              <InputGroupText className="input-group-merge border-1 shadow-none">
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                className="border-1"
                placeholder="Search task"
                onChange={(e) => setText(e.target.value)}
                // value={query}
                // onChange={handleFilter}
              />
              <InputGroupText className="input-group-merge border-1 shadow-none">
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
              </InputGroupText>
            </InputGroup>
          </div>
        </div>
        <div></div>
      </div>
      {tasks.length === 0 ? (
        <ListGroup>
          <ListGroupItem
            key={'empty-list'}
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
            <div className="task-name">
              <img style={{ width: '100px', height: '100px' }} src="/empty.svg" alt="" />
              <br />
              <span style={{ paddingLeft: 15 }}> Task is empty </span>
            </div>
          </ListGroupItem>
        </ListGroup>
      ) : (
        <ListGroup tag="div">
          {activeTab !== 'past-due' &&
            tasks.map((task) => (
              <ListGroupItem
                key={task._id}
                action
                onClick={() => taskClickHandler(task)}
                active={task._id == selectedWorkingTask?._id}
                // className={active ? 'bg-primary' : 'bg-white'}
              >
                <div className="d-flex justify-content-between w-100">
                  <div className="mb-1" style={{ fontWeight: 800 }}>
                    {task?.taskName}
                  </div>
                  <small className="text-secondary">
                    {activeTab === 'past-due' && moment(task?.schedule[0]?._date).format('L')}
                  </small>
                </div>
                <div className="mb-1">
                  {/* <span className={active ? 'text-white' : 'text-black'}> */}
                  {moment(task?.startDate).format('h:mm a')} (In{' '}
                  {parseInt(moment.duration(moment(new Date()).diff(task?.startTime)).asHours())}{' '}
                  hour)
                  {/* </span> */}
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <div>
                      {task?.schedule[0]?.checkList?.length}/{task?.checkList?.length}
                    </div>
                    <div>
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
                    </div>
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
export default CheckLists;
