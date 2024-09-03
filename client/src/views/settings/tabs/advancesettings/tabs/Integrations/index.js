import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Nav,
  NavLink,
  NavItem,
  Button,
  TabPane,
  TabContent,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import ConnectedIntegrations from './ConnectedIntegrations';
import AvailableIntegrations from './AvailableIntegrations';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Integration = () => {
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <div className="m-1">
      <Nav tag="div" pills>
        <NavItem tag={NavLink} onClick={() => toggleTab('1')} active={active === '1'} action>
          <span className="align-middle">Connected Integrations</span>
        </NavItem>
        <NavItem tag={NavLink} onClick={() => toggleTab('2')} active={active === '2'}>
          <span className="align-middle"> Available Integrations</span>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <ConnectedIntegrations />
        </TabPane>
        <TabPane tabId="2">
          <AvailableIntegrations />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Integration;
