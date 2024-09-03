// ** React Imports
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Badge,
  Card,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane
} from 'reactstrap';
import { Calendar, DollarSign, Menu, Trash2 } from 'react-feather';
import { MessageCircle, Twitch } from 'react-feather';
import Flatpickr from 'react-flatpickr';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import '@styles/react/apps/app-email.scss';

import { Mail, Send, Edit2, Folder, Trash, Plus, Code } from 'react-feather';
// ** Components imports live chat layout etc

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

const statusColors = {
  active: 'light-success',
  deactive: 'light-danger'
};

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'In Active' },
  { value: 'pending', label: 'pending' }
];

const Sidebar = ({ contactState, setContactState, projectList }) => {
  // ** Props
  const [isActive, setIsActive] = useState(false);
  const [active, setActive] = useState('1');
  const [text, setText] = useState('');
  const [chips, setChips] = useState([]);
  const [validationError, setValidationError] = useState('');
  let now = new Date();

  function removeChip(chipToRemove) {
    // filtering out the chip that the user wants to remove
    const updatedChips = chips.filter((chip) => chip !== chipToRemove);
    setChips(updatedChips);
  }

  function handlePressEnter(e) {
    // don't submit the form if the user presses 'Enter'
    if (e.key === 'Enter') e.preventDefault();
    // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
    if (e.key !== 'Enter' || !text) return;
    // need to show error if the user tries to add the same input more than once
    if (chips.includes(text)) {
      return setValidationError('Cannot add the same input more than once');
    }
    // adding the input value to chips array
    setChips((prevState) => [...prevState, e.target.value]);
    // clearing the input box
    setText('');
    // clearing error message
    setValidationError('');
  }

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <>
      <Card>
        <Row className="p-1">
          <CardHeader>
            <CardTitle>Employment</CardTitle>
          </CardHeader>
          <Col sm="6">
            <Label className="form-label" for="pubchId">
              Punch ID
            </Label>
            <Input
              type="text"
              name="punchId"
              placeholder="Punch ID"
              onChange={(e) => {
                setContactState((p) => ({
                  ...p,
                  punchId: e.target.value
                }));
              }}
            />
            <CardText className="mt-1">The Number that this.employee can Punch in with..</CardText>
          </Col>
          <Col sm="6">
            <Label className="form-label" for="employeeId">
              Employee ID
            </Label>
            <Input
              type="text"
              name="employeeId"
              placeholder="ID of Employee"
              onChange={(e) => {
                setContactState((p) => ({
                  ...p,
                  employeeId: e.target.value
                }));
              }}
            />
            <CardText className="mt-1">
              Either an internal employee ID or an ID assigned by your payroll provider that used in
              payroll export
            </CardText>
          </Col>
          <Col sm="6">
            <Label className="form-label" for="weeklyHours">
              Max Weekly Hours
            </Label>
            <Input
              type="number"
              placeholder="Max hours per week"
              onChange={(e) => {
                setContactState((p) => ({
                  ...p,
                  maxWeeklyHours: e.target.value
                }));
              }}
            />
            <CardText className="mt-1">
              This is not used for overtime. looking for overtime rules?
            </CardText>
          </Col>
          <Col sm="6">
            <Label className="form-label" for="hireDate">
              Hire Date
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText className="border-end-0">
                <Calendar size={15} />
              </InputGroupText>
              <Flatpickr
                data-enable-time
                id="date-time-picker"
                className="form-control"
                defaultValue={now}
                onChange={(date) => {
                  setContactState((p) => ({
                    ...p,
                    hireEnd: date
                  }));
                }}
              />
            </InputGroup>
          </Col>
          <Col sm="6">
            <Label className="form-label" for="hireDate">
              Employee Type
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <Input
                id="employeeType"
                name="employeeType"
                defaultValue={'remote'}
                type="select"
                onChange={(e) => {
                  setContactState((p) => ({
                    ...p,
                    employeeType: e.target.value
                  }));
                }}
              >
                <option value="all">All</option>
                <option value="remote">Remote</option>
                <option value="inHouse">In-House</option>
              </Input>
            </InputGroup>
          </Col>
          <Col sm="6">
            <Label className="form-label" for="hireDate">
              Select Project
            </Label>
            <Input
              type="select"
              id="assignedProject"
              name="assignedProject"
              onChange={(e) => {
                setContactState((p) => ({
                  ...p,
                  assignedProject: e.target.value
                }));
              }}
            >
              <option value="">Selecting Project...</option>
              {projectList?.map((p, i) => {
                return (
                  <option key={i} value={p.projectName}>
                    {p.projectName}
                  </option>
                );
              })}
            </Input>
            <ul className="emp_chips">
              {chips.map((chip) => (
                <li key={chip} className="emp_chip">
                  <span>{chip}</span>
                  <Trash2 onClick={() => removeChip(chip)} tabIndex="0" size={15} />
                </li>
              ))}
            </ul>
          </Col>
          <Col sm="6" className="mt-1">
            <div className="d-flex">
              <Button className="me-1" color="primary" size="sm" type="button">
                Save
              </Button>
              <Button outline color="secondary" size="sm" type="reset">
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Sidebar;
