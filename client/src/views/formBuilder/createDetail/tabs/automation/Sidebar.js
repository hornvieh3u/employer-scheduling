// ** React Imports
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink, TabContent, TabPane } from 'reactstrap';
import { Menu } from 'react-feather';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BarChart2 } from 'react-feather';
import {
  Modal,
  ModalHeader,
  Form,
  Row,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
// ** Components imports live chat layout etc
import Layout from './layout';
import Livechat from './tabs/livechat';
import Chatbot from './tabs/chatbot';
import Retention from './tabs/retention';
import Api from './tabs/api';
import Scripts from './tabs/scripts';
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
  const [modalnewsmartlist, setModalnewsmartlist] = useState(false);
  const togglemodalnewsmartlist = () => setModalnewsmartlist(!modalnewsmartlist);
  return (
    <>
      <Modal centered={true} isOpen={modalnewsmartlist} toggle={togglemodalnewsmartlist} size="lg">
        <ModalHeader toggle={togglemodalnewsmartlist}>Add Progression</ModalHeader>
        <ModalBody className="p-2">
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="programName">Program Name</Label>
                  <Input
                    id="program"
                    name="programName"
                    placeholder="with a placeholder"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="Total Rank">Total Rank</Label>
                  <Input
                    id="rank"
                    name="totalRank"
                    placeholder="password placeholder"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="progression">Progression</Label>
                  <Input id="progression" name="select" type="select">
                    <option>Progression 1</option>
                    <option>Progression2</option>
                    <option>Progression 3</option>
                    <option>Progression 4</option>
                    <option>Progression 5</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormGroup>
                    <Label for="belttype">Belt Type</Label>
                    <Input id="belttype" name="select" type="select">
                      <option>Belt Type 1</option>
                      <option>Belt Type 2</option>
                      <option>Belt Type 3</option>
                      <option>Belt Type 4</option>
                      <option>Belt Type 5</option>
                    </Input>
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormGroup>
                    <Label for="Requirement">Requirement</Label>
                    <Input id="Requirement" name="select" type="select">
                      <option>Requirement 1</option>
                      <option>Requirement 2</option>
                      <option>Requirement 3</option>
                      <option>Requirement 4</option>
                      <option>Requirement 5</option>
                    </Input>
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="Color">Color</Label>
                  <Input id="Color" name="color" placeholder="color placeholder" type="color" />
                </FormGroup>
              </Col>
              <Col md={6}></Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleFile">UPLOAD</Label>
                  <Input id="exampleFile" name="file" type="file" />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="btn btn-outline-danger" onClick={togglemodalnewsmartlist}>
            Cancle
          </Button>{' '}
          <Button color="btn btn-primary" onClick={togglemodalnewsmartlist}>
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
                <Button
                  className="compose-email"
                  color="primary"
                  block
                  onClick={togglemodalnewsmartlist}
                >
                  New Progression
                </Button>
              </div>
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <h6 className="section-label  mb-1 px-2">Progresssions</h6>
                <ListGroup tag="div" className="list-group-labels">
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('6')}
                    active={active === '6'}
                  >
                    <BarChart2 size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Progression item 1
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('7')}
                    active={active === '7'}
                  >
                    <BarChart2 size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Progression item 2
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('8')}
                    active={active === '8'}
                  >
                    <BarChart2 size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Progression item 3
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('9')}
                    active={active === '9'}
                  >
                    <BarChart2 size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Progression item 4
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
            <PerfectScrollbar>
              <TabContent activeTab={active}>
                <TabPane tabId="6">
                  <Layout
                    title="Progression 1"
                    subtitle1="ProgressionSubTitle1"
                    subtitle2="ProgressionSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
                </TabPane>
                <TabPane tabId="7">
                  <Layout
                    title="Progression 2"
                    subtitle1="ProgressionSubTitle1"
                    subtitle2="ProgressionSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
                </TabPane>
                <TabPane tabId="8">
                  <Layout
                    title="Progression 3"
                    subtitle1="ProgressionSubTitle1"
                    subtitle2="ProgressionSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
                </TabPane>
                <TabPane tabId="9">
                  <Layout
                    title="Progression 4"
                    subtitle1="ProgressionSubTitle1"
                    subtitle2="ProgressionSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
                </TabPane>
                <TabPane tabId="10">
                  <Layout
                    title="Progression 5"
                    subtitle1="ProgressionSubTitle1"
                    subtitle2="ProgressionSubTitle2"
                    des1="des 1"
                    des2="des 2"
                  />
                </TabPane>
                <TabPane tabId="11">
                  <Layout
                    title="Progression 6"
                    subtitle1="ProgressionSubTitle1"
                    subtitle2="ProgressionSubTitle2"
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
