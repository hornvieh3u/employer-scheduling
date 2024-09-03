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
import Layout from './layout';
import Livechat from './tabs/livechat';
import Chatbot from './tabs/chatbot';
import Retention from './tabs/retention';
import Api from './tabs/api';
import Scripts from './tabs/scripts';
import { BiUser } from 'react-icons/bi';
import { BsCircle } from 'react-icons/bs';
// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
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
                    <BiUser size={18} className="me-75" />
                    <span className="align-middle">Candidate</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    // onClick={() => toggleTab('2')}
                    active={active === '2'}
                  >
                    {/* <BsCircle size={14} className="me-75" /> */}
                    {/* <span className="align-middle">Live Chat</span> */}
                    {/* <span className="align-middle">Leadership Club</span> */}
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    // onClick={() => toggleTab('3')}
                    active={active === '3'}
                  >
                    {/* <BsCircle size={14} className="me-75" /> */}
                    {/* <span className="align-middle">Chatbot</span> */}
                    {/* <span className="align-middle">BBC Candidate List</span> */}
                  </ListGroupItem>
                </ListGroup>
                {/* <h6 className="section-label mt-3 mb-1 px-2">
                                    SMART LIST
                                </h6> */}
                {/* <ListGroup tag="div" className="list-group-labels">
                                    <ListGroupItem
                                        tag={NavLink}

                                        onClick={() => toggleTab('6')}
                                        active={active === '6'}
                                    >
                                        <Folder size={18} className="me-75" />
                                        <span className="align-middle"></span>
                                        Folder 1

                                    </ListGroupItem>
                                    <ListGroupItem
                                        tag={NavLink}
                                        onClick={() => toggleTab('7')}
                                        active={active === '7'}
                                    >
                                        <Folder size={18} className="me-75" />
                                        <span className="align-middle"></span>
                                        Folder 2
                                    </ListGroupItem>
                                    <ListGroupItem
                                        tag={NavLink}
                                        onClick={() => toggleTab('8')}
                                        active={active === '8'}
                                    >
                                        <Folder size={18} className="me-75" />
                                        <span className="align-middle"></span>
                                        Folder 3
                                    </ListGroupItem>
                                    <ListGroupItem
                                        tag={NavLink}
                                        onClick={() => toggleTab('9')}
                                        active={active === '9'}
                                    >
                                        <Folder size={18} className="me-75" />
                                        <span className="align-middle"></span>
                                        Folder 3
                                    </ListGroupItem>
                                </ListGroup> */}
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
            <PerfectScrollbar>
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <Retention />
                </TabPane>
                <TabPane tabId="2">
                  <Livechat />
                </TabPane>
                <TabPane tabId="3">
                  <Chatbot />
                </TabPane>
                <TabPane tabId="4">
                  <Api />
                </TabPane>
                <TabPane tabId="5">
                  <Scripts />
                </TabPane>
                <TabPane tabId="6">
                  <Layout
                    title="Smartlist 1"
                    subtitle1="SmartlistSubTitle1"
                    subtitle2="SmartlistSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
                </TabPane>
                <TabPane tabId="7">
                  <Layout
                    title="Smartlist 2"
                    subtitle1="SmartlistSubTitle1"
                    subtitle2="SmartlistSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
                </TabPane>
                <TabPane tabId="8">
                  <Layout
                    title="Smartlist 3"
                    subtitle1="SmartlistSubTitle1"
                    subtitle2="SmartlistSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
                </TabPane>
                <TabPane tabId="9">
                  <Layout
                    title="Smartlist 4"
                    subtitle1="SmartlistSubTitle1"
                    subtitle2="SmartlistSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
                </TabPane>
                <TabPane tabId="10">
                  <Layout
                    title="Smartlist 5"
                    subtitle1="SmartlistSubTitle1"
                    subtitle2="SmartlistSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
                </TabPane>
                <TabPane tabId="11">
                  <Layout
                    title="Smartlist 6"
                    subtitle1="SmartlistSubTitle1"
                    subtitle2="SmartlistSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
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
