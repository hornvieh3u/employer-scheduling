import React, { memo, useState, useEffect, Fragment } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container
} from 'reactstrap';
import classnames from 'classnames';

import { FaRocketchat, FaAppStore, FaNewspaper, FaCalendarAlt } from 'react-icons/fa';
function TextChatTabs() {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
      <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
        <Fragment>
          <Nav pills className="mb-2 tab-header">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === '1'
                })}
                onClick={() => {
                  toggle('1');
                }}
              >
                <FaNewspaper />
                New
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === '2'
                })}
                onClick={() => {
                  toggle('2');
                }}
              >
                <FaRocketchat />
                Chat
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === '3'
                })}
                onClick={() => {
                  toggle('3');
                }}
              >
                {' '}
                <FaAppStore />
                AUTOMATION
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === '4'
                })}
                onClick={() => {
                  toggle('4');
                }}
              >
                <FaCalendarAlt />
                SCHEDULE
              </NavLink>
            </NavItem>
          </Nav>
        </Fragment>
      </Col>
    </Row>
  );
}
export default memo(TextChatTabs);
