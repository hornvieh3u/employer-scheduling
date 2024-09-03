// ** React Imports
import { Fragment, useState } from 'react';

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

// ** Icons Imports
import { User, Bookmark, Archive } from 'react-feather';
import { VscNotebook } from 'react-icons/vsc';
import { GiRank2 } from 'react-icons/gi';
import { AiOutlineSafetyCertificate, AiOutlineFilePdf, AiOutlineHistory } from 'react-icons/ai';

// ** User Components
import OverviewTab from './tabs/overview';
import InvoiceTab from './tabs/InvoiceTab';
import RankTab from './tabs/RankTab';
import BillingPlanTab from './tabs/BillingTab';
import Progression from './tabs/Progression';
import UserProjectsList from './tabs/UserProjectsList';
import FilesTab from './tabs/FilesTab';
import OtherTab from './tabs/OtherTab';
import EmployeMent from './tabs/EmployeMent';
import WorkHistoryTab from './tabs/WorkHistoryTab';
import Notes from './tabs/Notes';

const UserTabs = ({ active, toggleTab, selectedEmployee }) => {
  const props = {
    selectedEmployee
  };
  return (
    <Fragment>
      <Nav pills className="mb-2">
        {/* <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Overview</span>
          </NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink active={active === '6'} onClick={() => toggleTab('6')}>
            <AiOutlineHistory className="font-medium-3 me-50" />
            <span className="fw-bold">Work History</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Employment</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Progression</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <AiOutlineFilePdf className="font-medium-3 me-50" />
            <span className="fw-bold">Files</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
            <AiOutlineFilePdf className="font-medium-3 me-50" />
            <span className="fw-bold">Notes</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <OverviewTab />
        </TabPane>
        <TabPane tabId="2">
          <EmployeMent selectedEmployee={props.selectedEmployee} />
        </TabPane>
        <TabPane tabId="3">
          <Progression {...props} />
        </TabPane>
        <TabPane tabId="4">
          <FilesTab {...props} />
        </TabPane>
        <TabPane tabId="5">
          <Notes {...props} />
        </TabPane>
        <TabPane tabId="6">
          <WorkHistoryTab {...props} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
