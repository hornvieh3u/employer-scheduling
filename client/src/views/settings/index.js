// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// ** Icons Imports
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import { RiFilePaperLine } from 'react-icons/ri';

// ** User Components

import Notifications from './tabs/notifications';

import Billing from './tabs/billing';
import Account from './tabs/account';
import Rolesandper from './tabs/rolesandper';
import Security from './tabs/security';
import axios from 'axios';
import Progressiontab from './tabs/progressiontab';
import Advancesettings from './tabs/advancesettings';

import { Col, Row } from 'reactstrap';
import Depositfunds from '../depositfunds';

const UserTabs = () => {
  const [data, setData] = useState(null);
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  useEffect(() => {
    axios.get('/account-setting/data').then((response) => setData(response.data));
  }, []);
  useEffect(() => {
    const params1 = window.location.pathname.split('/setting/');
    // console.log('params1', params1[1]);
    if (params1[1] === 'Account') {
      setActive('1');
    }
  }, []);
  return (
    <>
      <Row>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <FiSettings className="font-medium-1 me-50" />
                  <span className="fs-6">Account</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <GiRank2 className="font-medium-1 me-50" />
                  <span className="fs-6">Billing</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <BsUiChecks className="font-medium-1 me-50" />
                  <span className="fs-6">Permissions and Roles</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">Progression</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                  <RiFilePaperLine className="font-medium-1 me-50" />
                  <span className="fs-6">Advanced Settings</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '6'} onClick={() => toggleTab('6')}>
                  <MdOutlineNotifications className="font-medium-1 me-50" />
                  <span className="fs-6">Notifications</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '7'} onClick={() => toggleTab('7')}>
                  <MdOutlineNotifications className="font-medium-1 me-50" />
                  <span className="fs-6">Security</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '8'} onClick={() => toggleTab('8')}>
                  <MdOutlineNotifications className="font-medium-1 me-50" />
                  <span className="fs-6">Deposit</span>
                </NavLink>
              </NavItem>
            </Nav>
            {data !== null ? (
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <Account data={data.general} />
                </TabPane>
                <TabPane tabId="2">
                  <Billing />
                </TabPane>
                <TabPane tabId="3">
                  <Rolesandper />
                </TabPane>
                <TabPane tabId="4">
                  <Progressiontab />
                </TabPane>
                <TabPane tabId="5">
                  <Advancesettings />
                </TabPane>

                <TabPane tabId="6">
                  <Notifications />
                </TabPane>
                <TabPane tabId="7">
                  <Security />
                </TabPane>
                <TabPane tabId="8">
                  <Depositfunds />
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
