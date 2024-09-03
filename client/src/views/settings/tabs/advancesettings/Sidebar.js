/* eslint-disable no-unused-vars */
// ** React Imports
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink, TabContent, TabPane } from 'reactstrap';
import { Menu } from 'react-feather';
import { MessageCircle, Twitch } from 'react-feather';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Folder, Trash, Plus, Code } from 'react-feather';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Edit } from 'react-feather';
import { MoreVertical } from 'react-feather';
// ** Components imports live chat layout etc
import Layout from './layout';
import Livechat from './tabs/livechat';
import Chatbot from './tabs/chatbot';
import Retention from './tabs/retention';
import Api from './tabs/api';
import Scripts from './tabs/scripts';

// ** Store & Actions
import { getData, createSmartList, listIdSet } from './store';
import { useDispatch, useSelector } from 'react-redux';

// ** Reactstrap Imports
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  Modaldata,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';
import Integration from './tabs/Integrations/index';

const Sidebar = (props) => {
  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState('');
  const [modalnewsmartlist, setModalnewsmartlist] = useState(false);
  const togglemodalnewsmartlist = () => setModalnewsmartlist(!modalnewsmartlist);
  const [newSmartList, setNewSmartList] = useState('');
  const dispatch = useDispatch();
  const store = useSelector((state) => state.smartList);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
    dispatch(listIdSet(tab));
  };

  const onAddSmartList = () => {
    setModalnewsmartlist(false);
    setNewSmartList('');
    dispatch(
      createSmartList({
        name: newSmartList
      })
    );
    dispatch(getData());
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <>
      <Modal centered={true} isOpen={modalnewsmartlist} toggle={togglemodalnewsmartlist} size="md">
        <ModalHeader toggle={togglemodalnewsmartlist}>Roles</ModalHeader>
        <ModalBody className="p-2">
          <FormGroup row>
            <Label for="Smartlistname" sm={6}>
              Smart List Name
            </Label>
            <Col sm={6}>
              <Input
                id="smartlistfolder"
                name="Smartlistname"
                placeholder="Enter folder Name"
                type="text"
                value={newSmartList}
                onChange={(e) => setNewSmartList(e.target.value)}
              />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="btn btn-outline-danger" onClick={togglemodalnewsmartlist}>
            Cancle
          </Button>{' '}
          <Button color="btn btn-primary" onClick={onAddSmartList}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

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
                    <span className="align-middle">Retention</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('2')}
                    active={active === '2'}
                  >
                    <MessageCircle size={18} className="me-75" />
                    <span className="align-middle">Live Chat</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('3')}
                    active={active === '3'}
                  >
                    <Twitch size={18} className="me-75" />
                    <span className="align-middle">Chatbot</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('4')}
                    active={active === '4'}
                  >
                    <Code size={18} className="me-75" />
                    <span className="align-middle">Api</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('5')}
                    active={active === '5'}
                  >
                    <Code size={18} className="me-75" />
                    <span className="align-middle">Script</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('12')}
                    active={active === '12'}
                  >
                    <Code size={18} className="me-75" />
                    <span className="align-middle">Integrations</span>
                  </ListGroupItem>
                </ListGroup>
                <div className="form-group-compose text-center compose-btn">
                  <h5 className="section-label">SMART LIST</h5>
                  <Button
                    className="compose-email"
                    color="primary"
                    block
                    onClick={togglemodalnewsmartlist}
                  >
                    Add Smart List
                  </Button>
                </div>
                <ListGroup tag="div" className="list-group-labels">
                  {store.smartLists.map((folderData, index) => (
                    <ListGroupItem
                      tag={NavLink}
                      key={index}
                      onClick={() => toggleTab(folderData._id)}
                      active={active === folderData._id}
                    >
                      <Folder size={18} className="me-75" />
                      <span className="align-middle">{folderData.name}</span>
                    </ListGroupItem>
                  ))}
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
                {store.smartLists.map((folderData, _index) => (
                  <TabPane tabId={folderData._id}>
                    <Layout />
                  </TabPane>
                ))}
                <TabPane tabId="12">
                  <Integration />
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
