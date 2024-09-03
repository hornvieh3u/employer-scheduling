// ** React Imports
import { useState,Fragment } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Menu } from 'react-feather';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Folder } from 'react-feather';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Facebook from './tabs/facebook';
import Overview from './tabs/overview';
import Seo from './tabs/seo';

import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
// ** Components imports live chat layout etc

// ** Reactstrap Imports

const Sidebar = (props) => {
  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <Fragment>
        <Row className="flex-md-fill m-0">
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
            <Fragment>
              <Nav pills className="mb-2">
                <NavItem>
                  <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                    <FiSettings className="font-medium-1 me-50" />
                    <span className="fs-6">OVERVIEW</span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                    <GiRank2 className="font-medium-1 me-50" />
                    <span className="fs-6">SEO</span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                    <BsUiChecks className="font-medium-1 me-50" />
                    <span className="fs-6">FACEBOOK PIXEL</span>
                  </NavLink>
                </NavItem>
              </Nav>
                <TabContent activeTab={active}>
                  <TabPane tabId="1">
                    <Overview />
                  </TabPane>
                  <TabPane tabId="2">
                    <Seo />
                  </TabPane>
                  <TabPane tabId="3">
                    <Facebook />
                  </TabPane>
                </TabContent>
            </Fragment>
          </Col>
        </Row>
      </Fragment>
    </>
  );
};

export default Sidebar;
