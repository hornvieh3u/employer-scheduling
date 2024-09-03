// ** React Imports
import { Fragment, useState } from 'react';

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

// ** Components
import Tasks from './Tasks';

const TaskListTabs = (props) => {
  // ** State
  const [active, setActive] = useState('active');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const buildProps = {
    ...props,
    active
  };

  return (
    <Fragment>
      <Nav className="justify-content-center" tabs>
        <NavItem>
          <NavLink
            active={active === 'active'}
            onClick={() => {
              toggle('active');
            }}
          >
            Active
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === 'inactive'}
            onClick={() => {
              toggle('inactive');
            }}
          >
            Inactive
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="active">
          <Tasks {...buildProps} />
        </TabPane>
        <TabPane tabId="inactive">
          <Tasks {...buildProps} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default TaskListTabs;
