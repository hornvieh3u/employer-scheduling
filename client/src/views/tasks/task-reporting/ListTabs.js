// ** React Imports
import { Fragment, useState } from 'react';

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

// ** Components
import CheckLists from './CheckLists';
import PastDueClient from './PastDueClient';

const ListTabs = (props) => {
  // ** State
  const [active, setActive] = useState('today');
  const { setSelectedWorkingCheckList, setTaskTab } = props;

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
      setSelectedWorkingCheckList(null);
      setTaskTab(tab);
    }
  };

  const buildProps = {
    ...props,
    activeTab: active
  };

  return (
    <Fragment>
      <Nav className="justify-content-center" tabs>
        <NavItem>
          <NavLink
            active={active === 'today'}
            onClick={() => {
              toggle('today');
            }}
          >
            Today
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === 'completed'}
            onClick={() => {
              toggle('completed');
            }}
          >
            Completed
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === 'past-due'}
            onClick={() => {
              toggle('past-due');
            }}
          >
            Past Due
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="today">
          <CheckLists {...buildProps} />
        </TabPane>
        <TabPane tabId="completed">
          <CheckLists {...buildProps} />
        </TabPane>
        <TabPane tabId="past-due">
          <PastDueClient {...buildProps} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default ListTabs;
