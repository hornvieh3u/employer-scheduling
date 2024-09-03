// ** React Imports
import { useState } from 'react';
import { NavLink, TabContent, TabPane } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { Briefcase, Menu, Package, Users, TrendingUp, GitMerge, User } from 'react-feather';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Folder } from 'react-feather';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import MyForm from './tabs/chatbox';

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
                <div className="form-group-compose text-center compose-btn"></div>
                <ListGroup tag="div" className="list-group-labels">
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('6')}
                    active={active === '6'}
                  >
                    <Users size={18} className="me-75" />
                    <span className="align-middle"></span>
                    LiveChat Scripts
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
            <PerfectScrollbar style={{ backgroundColor: 'white' }}>
              <TabContent activeTab={active}>
                <TabPane tabId="6">
                  <MyForm />
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
