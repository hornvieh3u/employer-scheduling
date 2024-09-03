// ** React Imports
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink, TabContent, TabPane } from 'reactstrap';
import { Menu } from 'react-feather';
import { MessageCircle, Twitch } from 'react-feather';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Folder, Trash, Plus, Code } from 'react-feather';
// ** Components imports live chat layout etc

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import IncomeTypeFilter from './IncomeTypeFilter';
import MemberStatistics from '../views/MemberStatistics';
import ProgramStatistics from '../views/ProgramStatistics';
import LeadStatistics from '../views/LeadStatistics';
import RankStatistics from './RankTable';

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
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <div className="form-group-compose text-center compose-btn">
                <Button className="compose-email" color="primary" block>
                  Some Action
                </Button>
              </div>
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <ListGroup tag="div" className="list-group-messages">
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('1')}
                    active={active === '1'}
                    action
                  >
                    <Mail size={18} className="me-75" />
                    <span className="align-middle">Member Statistics</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('2')}
                    active={active === '2'}
                  >
                    <MessageCircle size={18} className="me-75" />
                    <span className="align-middle">Program Statistics</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('3')}
                    active={active === '3'}
                  >
                    <Twitch size={18} className="me-75" />
                    <span className="align-middle">Lead Statistics</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('4')}
                    active={active === '4'}
                  >
                    <Twitch size={18} className="me-75" />
                    <span className="align-middle">Rank Statistics</span>
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
            <IncomeTypeFilter />

            <PerfectScrollbar>
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <MemberStatistics />
                </TabPane>
                <TabPane tabId="2">
                  <ProgramStatistics />
                </TabPane>
                <TabPane tabId="3">
                  <LeadStatistics />
                </TabPane>
                <TabPane tabId="4">
                  <RankStatistics />
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
