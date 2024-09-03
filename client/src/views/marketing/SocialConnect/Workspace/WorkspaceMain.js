import React, { Fragment, useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import {
  Button,
  Card,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import GridView from './GridView';
import FeedView from './FeedView';
import CalendarView from './CalendarView';
import { Edit2 } from 'react-feather';
import { FcGoogle } from 'react-icons/fc';
import { CgProfile } from 'react-icons/cg';
import { FaFacebookSquare } from 'react-icons/fa';

const WorkspaceMain = () => {
  const [active, setActive] = useState('today');
  const [viewType, setViewType] = useState('Feed View');
  const toggle = (tab) => {
    // if (active !== tab) {
    setActive(tab);
    // setSelectedWorkingCheckList(null)
    // setTaskTab(tab)
    // }
  };
  const handleViewType = (e) => {
    setViewType(e.target.value);
  };

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Social Connect"
        breadCrumbParent="Marketing"
        breadCrumbActive="Workspace"
      />
      <Card className="p-1">
        <Row>
          <Col sm={2} md={2} lg={2}>
            <Input type="select" onChange={handleViewType} value={viewType}>
              <option value="Grid View">Grid View</option>
              <option value="Feed View">Feed View</option>
              <option value="Calendar View">Calendar View</option>
            </Input>
          </Col>
          <Col sm={8} md={8} lg={8}>
            <Nav className="justify-content-center mb-0" tabs>
              <NavItem>
                <NavLink
                  active={active === 'today'}
                  onClick={() => {
                    toggle('today');
                  }}
                >
                  <FaFacebookSquare size={28} />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === 'completed'}
                  onClick={() => {
                    toggle('completed');
                  }}
                >
                  <FcGoogle size={28} />
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col sm={2} md={2} lg={2} className="d-flex justify-content-end">
            <Button color="success">
              <Edit2 size={18} className="me-1" />
              Compose
            </Button>
          </Col>
        </Row>
      </Card>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="today">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>

        <TabPane tabId="completed">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default WorkspaceMain;
