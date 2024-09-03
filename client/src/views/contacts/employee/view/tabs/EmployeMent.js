// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardText,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane
} from 'reactstrap';
import { Calendar, DollarSign, Menu } from 'react-feather';
import { MessageCircle, Twitch } from 'react-feather';
import Flatpickr from 'react-flatpickr';
import EmployementBox from './EmployementBox';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import '@styles/react/apps/app-email.scss';

import { Mail, Send, Edit2, Folder, Trash, Plus, Code } from 'react-feather';
// ** Components imports live chat layout etc

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import AssignProject from './AssignProject';
import { FiSettings } from 'react-icons/fi';
import { GiRank2 } from 'react-icons/gi';

import { customInterIceptors } from '../../../../../lib/AxiosProvider';

import { useGetAllRole } from '../../../../../requests/contacts/employee-contacts';

const API = customInterIceptors();

// Employee Status Option
const wageType = [
  { value: 'hourly', label: 'Hourly' },
  { value: 'fixed', label: 'Fixed' }
];

const Sidebar = ({ selectedEmployee }) => {
  // ** Props
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // Get projects from db
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await API.get('/project');
      return data;
    };
    fetchProjects().then((data) => {
      setProjectList(data.list);
    });
  }, []);

  // get role data from db

  const { data: roles } = useGetAllRole();
  const [roleList, setRoleList] = useState([]);
  useEffect(() => {
    setRoleList(roles);
  }, [roles]);

  const [contactState, setContactState] = useState({
    wageType: '',
    newWageBudget: '',
    newWageDate: '',
    punchId: '',
    employeeId: '',
    maxWeeklyHours: 0,
    hireEnd: '',
    employeeType: '',
    assignedProject: '',
    email: selectedEmployee.email ? selectedEmployee.email : '',
    password: '',
    confirmPassword: '',
    status: 'inactive',
    roleId: '',
    sendType: 'email'
  });

  return (
    <>
      <Card>
        <Row className="p-1">
          {/* <Col md={3}>
          <div
            className={classnames('sidebar-left', {
              show: sidebarOpen
            })}
          >
            <div className="sidebar">
              <div className="sidebar-content email-app-sidebar">
                <div className="email-app-menu">
                  <PerfectScrollbar
                    className="sidebar-menu-list"
                    options={{ wheelPropagation: false }}
                  >
                    <ListGroup tag="div" className="list-group-messages">
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('1')}
                        active={active === '1'}
                        action
                      >
                        <Mail size={18} className="me-75" />
                        <span className="align-middle">My Folder</span>
                      </ListGroupItem>
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('2')}
                        active={active === '2'}
                      >
                        <MessageCircle size={18} className="me-75" />
                        <span className="align-middle">Personal</span>
                      </ListGroupItem>
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('3')}
                        active={active === '3'}
                      >
                        <Twitch size={18} className="me-75" />
                        <span className="align-middle">Employee</span>
                      </ListGroupItem>
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('4')}
                        active={active === '4'}
                      >
                        <Twitch size={18} className="me-75" />
                        <span className="align-middle">Wages And Payment</span>
                      </ListGroupItem>
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('5')}
                        active={active === '5'}
                      >
                        <Twitch size={18} className="me-75" />
                        <span className="align-middle">Permission</span>
                      </ListGroupItem>
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('6')}
                        active={active === '6'}
                      >
                        <Twitch size={18} className="me-75" />
                        <span className="align-middle">Work History</span>
                      </ListGroupItem>
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('7')}
                        active={active === '7'}
                      >
                        <Twitch size={18} className="me-75" />
                        <span className="align-middle">Notes</span>
                      </ListGroupItem>
                    </ListGroup>
                  </PerfectScrollbar>
                </div>
              </div>
            </div>
          </div>
        </Col> */}
          {/* <Col md={9}>
          <div className="content-right">
            <div className="content-body">
              <div
                className={classnames('body-content-overlay', {
                  show: sidebarOpen
                })}
                onClick={() => setSidebarOpen(false)}
              ></div>
              <div className="email-app-list">
                <div className="app-fixed-search d-flex d-lg-none align-items-center">
                  <div
                    className="sidebar-toggle d-block d-lg-none ms-1"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu size="21" />
                  </div>
                </div>

                <PerfectScrollbar>
                  <TabContent activeTab={active}>
                    <TabPane tabId="1"></TabPane>
                    <TabPane tabId="2">2</TabPane>
                    <TabPane tabId="3">3</TabPane>
                    <TabPane tabId="4">4</TabPane>
                  </TabContent>
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </Col> */}
          <Col sm="6">
            <Label className="form-label" for="username">
              Wages Type
            </Label>
            <Input
              type="select"
              id="wageType"
              name="wageType"
              defaultValue={wageType[0].value}
              onChange={(e) => {
                setContactState((p) => ({
                  ...p,
                  wageType: e.target.value
                }));
              }}
            >
              {wageType?.map((p, i) => {
                return (
                  <option key={i} value={p.value}>
                    {p.label}
                  </option>
                );
              })}
            </Input>
            <CardText className="mt-1">
              Employees can only have one wage type. Set unique wages for each role by enabling
              Wage-Based Roles.
            </CardText>
          </Col>
          <hr className="mt-1" />
          <Col sm="12">
            <Table borderless color="primary">
              <thead>
                <tr>
                  <th>Wage</th>
                  <th>Effective date </th>
                  <th>New wage</th>
                  <th>New effective date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>$ 21</th>
                  <th>Sept 11, 2023</th>
                  <th>
                    <InputGroup className="input-group-merge" style={{ width: '150px' }}>
                      <InputGroupText>
                        <DollarSign size={15} />
                      </InputGroupText>
                      <Input
                        type="number"
                        name="newWageBudget"
                        onChange={(e) => {
                          setContactState((p) => ({
                            ...p,
                            newWageBudget: e?.target?.value
                          }));
                        }}
                      />
                    </InputGroup>
                  </th>
                  <th>
                    <InputGroup className="input-group-merge">
                      <InputGroupText className="border-end-0">
                        <Calendar size={15} />
                      </InputGroupText>
                      <Flatpickr
                        data-enable-time
                        id="date-time-picker"
                        className="form-control"
                        onChange={(date) => {
                          setContactState((p) => ({
                            ...p,
                            newWageDate: date
                          }));
                        }}
                      />
                    </InputGroup>
                  </th>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>
      <EmployementBox
        contactState={contactState}
        setContactState={setContactState}
        projectList={projectList}
      />
      <AssignProject
        contactState={contactState}
        setContactState={setContactState}
        roleList={roleList}
        selectedEmployee={selectedEmployee}
      />
    </>
  );
};

export default Sidebar;
