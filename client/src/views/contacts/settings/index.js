import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, MessageCircle, User, Users } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  NavLink,
  Row,
  Col,
  InputGroup,
  Input
} from 'reactstrap';
import classnames from 'classnames';
import { BsShift, BsDiagram3 } from 'react-icons/bs';
import { BiMoney } from 'react-icons/bi';

import GroupTable from './view/GroupTable';
import EmployeeTable from './view/EmployeeTable';
import ShiftTable from './view/ShiftTable';
import PositionTable from './view/PositionTable';
import PayrollTable from './view/PayrollTable';
import { toast } from 'react-toastify';

import { initModifiedSuccess } from './store/reducer';

function Setting() {
  const [active, setActive] = useState('0');
  const [activecard, setActivecard] = useState('');
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const { modified } = useSelector(state => state.scheduleSetting);

  useMemo(() => {
    if(modified.done === true) {
        if( modified.success ) {
            toast.success(modified.message);
        } else {
            toast.error("Error is occuered!");
        }

        dispatch( initModifiedSuccess() );
    }
  }, [modified]);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    
    <div className="overflow-hidden email-application">
      <div className="content-area-wrapper container-xxl p-0 animate__animated animate__fadeIn">
        <div
          className={classnames('sidebar-left', {
            show: sidebarOpen
          })}
        >
          <div className="sidebar">
            <div className="sidebar-content email-app-sidebar">
              <div className="email-app-menu">
                {/* <div className="form-group-compose text-center compose-btn">
                  <Addmyforms />
                </div> */}
                <PerfectScrollbar
                  className="sidebar-menu-list pt-2"
                  options={{ wheelPropagation: false }}
                >
                  <ListGroup tag="div" className="list-group-messages">
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('0')}
                      active={active === '0'}
                    >
                      <BsDiagram3 size={18} className="me-75" />
                      <span className="align-middle">Group</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('1')}
                      active={active === '1'}
                      action
                    >
                      <User size={18} className="me-75" />
                      <span className="align-middle">Position</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('2')}
                      active={active === '2'}
                    >
                      <BsShift size={18} className="me-75" />
                      <span className="align-middle">Shift</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('3')}
                      active={active === '3'}
                    >
                      <Users size={18} className="me-75" />
                      <span className="align-middle">Employee Type</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('4')}
                      active={active === '4'}
                    >
                      <BiMoney size={18} className="me-75" />
                      <span className="align-middle">Payroll</span>
                    </ListGroupItem>
                  </ListGroup>
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </div>
        <div className="content-right">
          <div className="content-body">
            <PerfectScrollbar>
              <TabContent activeTab={active}>
                <TabPane tabId="0">
                  <div className="email-user-list">
                    <Card className="overflow-hidden">
                      <GroupTable />
                    </Card>
                  </div>
                </TabPane>
                <TabPane tabId="1">
                  <div className="email-user-list">
                    <Card className="overflow-hidden">
                      <PositionTable />
                    </Card>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="email-user-list">
                    <Card className="overflow-hidden">
                      <ShiftTable />
                    </Card>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="email-user-list">
                    <Card className="overflow-hidden">
                      <EmployeeTable />
                    </Card>
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <div className="email-user-list">
                    <Card className="overflow-hidden">
                      <PayrollTable />
                    </Card>
                  </div>
                </TabPane>
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
