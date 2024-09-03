// ** React Imports
import { useState, useMemo, useEffect } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  ButtonGroup,
  InputGroup,
  InputGroupText
} from 'reactstrap';

import Select, { components } from 'react-select'; //eslint-disable-line

// ** Third Party Components
import Flatpickr from 'react-flatpickr';

// ** Custom Components
import Avatar from '@components/avatar';

import useMessage from '../../../../lib/useMessage';

// ** Icons Imports
import { CheckCircle, Calendar, Star, Inbox } from 'react-feather';

// ** actions
import { addTaskAction } from '../store/action';
import { contactListRequest } from '../../../contacts/employee/store/actions';

// ** Utils
import { selectThemeColors } from '@utils';

import { useDispatch, useSelector } from 'react-redux';

// reducer
import { addTaskReset } from '../store/reducer';

const AddTaskSidebar = (props) => {
  const { open, toggleSidebar, selectedTask } = props;

  // ** State
  const [picker, setPicker] = useState(new Date());
  const [cSelected, setCSelected] = useState([]);
  const [assignedTo, setAssignedTo] = useState(null);

  const { error, success } = useMessage();
  // ** Hooks
  const dispatch = useDispatch();
  const { employeeList } = useSelector((state) => state.employeeContact);

  const onCheckboxBtnClick = (selected) => {
    let selectedDays = [...cSelected];
    const index = selectedDays.indexOf(selected);

    if (index < 0) {
      selectedDays.push(selected);
    } else {
      selectedDays.splice(index, 1);
    }
    setCSelected([...selectedDays]);
  };

  const initialTask = {
    _id: '',
    taskName: '',
    startDate: '',
    points: 0,
    repeat: [],
    allowAsNa: false,
    isActive: true,
    assignee: {},
    email: ''
  };

  const [task, setTask] = useState(initialTask);
  function changeHandler(event) {
    const { name, value } = event.target;
    setTask((p) => ({ ...p, [name]: value }));
  }

  function changeAssigneeHandler(data) {
    setTask((p) => ({ ...p, assignee: data }));
  }

  // Add redux state
  const { addTask } = useSelector((state) => state.tasks);

  const { loading, success: addSuccess, error: addError } = addTask;

  useMemo(() => {
    if (addSuccess) {
      // if add success
      success('New Task Added');

      // Reset Value
      setCSelected([]);
      setTask(initialTask);

      dispatch(addTaskReset());
      // Close Sidebar
      toggleSidebar();
    }
  }, [addSuccess]);

  useEffect(() => {
    dispatch(
      contactListRequest({
        page: 1,
        pageSize: 100,
        text: ''
      })
    );
  }, [dispatch]);

  function addTaskHandler() {
    const { taskName, startDate, points, repeat, email } = task;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // validation
    if (taskName === '') {
      error('Task name must not empty !');
      return;
    }
    if (email === '' || !email.match(validRegex)) {
      error('enter a valid email');
      return;
    }
    // submit / Dispatch with date and repeat array
    dispatch(
      addTaskAction({
        ...task,
        assignee: assignedTo,
        repeat: cSelected,
        startDate: picker
      })
    );
  }

  useMemo(() => {
    if (selectedTask) {
      if (selectedTask?._id !== task?._id) {
        setTask(selectedTask);
        setCSelected(selectedTask?.repeat);
        setPicker(selectedTask?.startDate);
      }
    }
  }, [selectedTask]);

  // console.log(selectedTask)

  const assigneeOptions = employeeList.data
    ? employeeList.data.list.map((employee) => {
        return { value: employee._id, label: employee.fullName, img: employee.photo };
      })
    : null;

  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {renderClient(data)}
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const renderClient = (row) => {
    let tmpValue = 0;
    Array.from(row.value).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    if (row?.img) {
      return <Avatar className="me-1" img={row.img} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row.label || 'John Doe'}
          initials
        />
      );
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Add New Task"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => {
        toggleSidebar();
        //reset state
        setTask(initialTask);
      }}
      // onClosed={handleSidebarClosed}
    >
      <Form>
        <Row>
          <Col sm="12">
            <Label className="form-label" for="nameVerticalIcons">
              Task Name
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <CheckCircle size={15} />
              </InputGroupText>
              <Input
                type="text"
                name="taskName"
                onChange={changeHandler}
                id="nameVerticalIcons"
                placeholder="Task Name"
                value={task?.taskName}
              />
            </InputGroup>
          </Col>
          <Col sm="12">
            <Label className="form-label" for="date-time">
              Starting Date & Time
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText className="border-end-0">
                <Calendar size={15} />
              </InputGroupText>
              <Flatpickr
                value={picker}
                data-enable-time
                id="date-time-picker"
                className="form-control"
                onChange={(date) => setPicker(date)}
                options={{ dateFormat: 'm-d-Y h:i K', minDate: 'today' }}
              />
            </InputGroup>
          </Col>
          <Col sm="12">
            <Label className="form-label" for="points">
              Points
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <Star size={15} />
              </InputGroupText>
              <Input
                onFocus={(e) => e.target.select()}
                type="number"
                name="points"
                onChange={changeHandler}
                id="point"
                placeholder="Employee get points for completion"
                value={task?.points}
              />
            </InputGroup>
          </Col>

          <Col sm="12">
            <Label className="form-label" for="repeat">
              Repeat
            </Label>
            <div>
              <ButtonGroup className="mb-2">
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('sunday')}
                  outline={!cSelected.includes('sunday')}
                >
                  S
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('monday')}
                  outline={!cSelected.includes('monday')}
                >
                  M
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('tuesday')}
                  outline={!cSelected.includes('tuesday')}
                >
                  T
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('wednesday')}
                  outline={!cSelected.includes('wednesday')}
                >
                  w
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('thursday')}
                  outline={!cSelected.includes('thursday')}
                >
                  T
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('friday')}
                  outline={!cSelected.includes('friday')}
                >
                  F
                </Button>
                <Button
                  color="primary"
                  onClick={() => onCheckboxBtnClick('saturday')}
                  outline={!cSelected.includes('saturday')}
                >
                  S
                </Button>
              </ButtonGroup>
            </div>
          </Col>
          <Col sm="12">
            <Label className="form-label" for="assignee">
              Assignee
            </Label>
            <Select
              id="assignee"
              name="assignee"
              value={task?.assignee}
              isClearable={false}
              className="react-select mb-2"
              classNamePrefix="select"
              options={assigneeOptions}
              theme={selectThemeColors}
              onChange={(data) => {
                setAssignedTo(data);
                changeAssigneeHandler(data);
              }}
              components={{ Option: AssigneeComponent }}
            />
          </Col>
          <Col sm="12">
            <Label className="form-label" for="reportTo">
              Send Report to
            </Label>
            <InputGroup className="input-group-merge mb-3">
              <InputGroupText>
                <Inbox size={15} />
              </InputGroupText>
              <Input
                onFocus={(e) => e.target.select()}
                type="text"
                name="email"
                onChange={changeHandler}
                id="email"
                placeholder="Email: john.doe@example"
                value={task?.email}
              />
            </InputGroup>
          </Col>
          <Col sm="12" className="mb-2">
            <div className="form-check">
              <Input
                type="checkbox"
                id="remember-me-vertical-icons"
                defaultChecked={task?.allowAsNa || false}
                onClick={(e) => {
                  setTask((p) => ({
                    ...p,
                    allowAsNa: !p.allowAsNa
                  }));
                }}
              />
              <Label className="form-check-label" for="remember-me-vertical-icons">
                Allow user to mark as N/A
              </Label>
            </div>
          </Col>
          <Col sm="12" className="mb-3">
            <div className="form-check form-switch">
              <Input
                type="switch"
                name="customSwitch"
                id="exampleCustomSwitch"
                defaultChecked={task?.isActive || false}
                onClick={(e) => {
                  setTask((p) => ({
                    ...p,
                    isActive: !p.isActive
                  }));
                }}
              />
              <Label for="exampleCustomSwitch" className="form-check-label">
                Toggle this switch to Activate this Task
              </Label>
            </div>
          </Col>
          <Col sm="12">
            <div className="d-flex">
              <Button
                className="me-1"
                color="primary"
                type="button"
                onClick={addTaskHandler}
                disabled={loading}
              >
                {loading ? 'loading...' : ' Create'}
              </Button>
              <Button
                outline
                color="secondary"
                type="reset"
                // onClick={toggleSidebar}
              >
                Reset
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  );
};

export default AddTaskSidebar;
