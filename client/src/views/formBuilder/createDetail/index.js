/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row } from 'reactstrap';
// ** Icons Imports
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import { RiFilePaperLine } from 'react-icons/ri';
// module Import
import axios from 'axios';
// ** User Components
import Step from './tabs/step';
import Contact from './tabs/contact';
import Sales from './tabs/sales';
import Automation from './tabs/automation';
import Settings from './tabs/settings';
import Sidebar from './Sidebar';

const UserTabs = () => {
  // id
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  useEffect(() => {
    axios.get('/account-setting/data').then((response) => setData(response.data));
  }, []);

  return (
    <>
      <div className="overflow-hidden email-application">
          <div className="content-overlay"></div>
          <div className="content-area-wrapper container-xxl p-0 animate__animated animate__fadeIn">
              <Fragment>
                  <Sidebar
                    id={id}
                   sidebarOpen={sidebarOpen} 
                   setSidebarOpen={setSidebarOpen} />
              </Fragment>
          </div>
      </div>
      <Row className="flex-md-fill m-0">
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <FiSettings className="font-medium-1 me-50" />
                  <span className="fs-6">STEP</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <GiRank2 className="font-medium-1 me-50" />
                  <span className="fs-6">CONTACT</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <BsUiChecks className="font-medium-1 me-50" />
                  <span className="fs-6">SALES</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">AUTOMATIONS</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                  <MdOutlineNotifications className="font-medium-1 me-50" />
                  <span className="fs-6">SETTINGS</span>
                </NavLink>
              </NavItem>
            </Nav>
            {data !== null ? (
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <Step data={data.general} />
                </TabPane>
                <TabPane tabId="2">
                  <Contact />
                </TabPane>
                <TabPane tabId="3">
                  <Sales />
                </TabPane>
                <TabPane tabId="4">
                  <Automation />
                </TabPane>
                <TabPane tabId="5">
                  <Settings />
                </TabPane>
              </TabContent>
            ) : null}
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default UserTabs;
