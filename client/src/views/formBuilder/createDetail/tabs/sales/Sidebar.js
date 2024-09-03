// ** React Imports
import { useState } from 'react';
import { NavLink, TabContent, TabPane } from 'reactstrap';
import { Briefcase, Menu, Package, Users, TrendingUp, GitMerge, User } from 'react-feather';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Folder } from 'react-feather';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import Clients from './tabs/clients';
import Leads from './tabs/leads';
import Relationship from './tabs/relationship';
import Vendor from './tabs/vendor';
import Employee from './tabs/employee';
import Roles from './tabs/roles';

// ** Components imports live chat layout etc

// ** Reactstrap Imports

const Sidebar = (props) => {
  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState('6');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <div className="form-group-compose text-center compose-btn">
                  <Button color="primary">Add Contact Type</Button>
                </div>
                <ListGroup tag="div" className="list-group-labels">
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('6')}
                    active={active === '6'}
                  >
                    <Users size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Clients
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('7')}
                    active={active === '7'}
                  >
                    <TrendingUp size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Leads
                  </ListGroupItem>

                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('9')}
                    active={active === '9'}
                  >
                    <GitMerge size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Relationships
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('10')}
                    active={active === '10'}
                  >
                    <Package size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Vendor
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('11')}
                    active={active === '11'}
                  >
                    <User size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Employee
                  </ListGroupItem>
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="email-app-list">
            <div className="app-fixed-search d-flex d-lg-none align-items-center">
              <div
                className="sidebar-toggle d-block d-lg-none ms-1"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size="21" />
              </div>
            </div>
            <div className="card p-2">
              <h3>Roles and Permissions</h3>
            </div>
            <PerfectScrollbar>
              <TabContent activeTab={active}>
                <TabPane tabId="6">
                  <Roles />
                </TabPane>
                <TabPane tabId="7">
                  <Relationship />
                </TabPane>

                <TabPane tabId="9">
                  <Relationship />
                </TabPane>
                <TabPane tabId="10">
                  <Relationship />
                </TabPane>
                <TabPane tabId="11">
                  <Roles />
                </TabPane>
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
