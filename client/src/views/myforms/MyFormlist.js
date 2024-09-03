// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { Mail, Send, Edit2, Folder, Trash, Plus, MessageCircle, ChevronDown } from 'react-feather';

// ** myforms App Component Imports
import Sidebar from './createdoc/Sidebar';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Select from 'react-select';

// ** Third Party Components
import classnames from 'classnames';
import DataTable from 'react-data-table-component';

import { myFormData, data, mytask, myTask } from './data';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  ListGroup,
  ListGroupItem,
  Badge,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  CardTitle,
  InputGroup,
  Input,
  Row,
  Col,
  Button
} from 'reactstrap';

// ** Styles
import '@styles/react/apps/app-email.scss';
import FormList from './FormList';
import Addmyforms from './Addmyforms';
import RolesCard from './Card';

const MyFormlist = () => {
  const carddata = [
    {
      title: 'Role Type 1',
      date: '01/01/23',
      time: '03:09',
      totalrank: '12',
      type: 'By Stripe',
      rank: '21'
    },
    {
      title: 'Role Type 2',
      date: '01/01/23',
      time: '03:09',
      totalrank: '12',
      type: 'By Stripe',
      rank: '21'
    },
    {
      title: 'Role Type 3',
      date: '01/01/23',
      time: '03:09',
      totalrank: '12',
      type: 'By Stripe',
      rank: '21'
    }
  ];

  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addFolderHide, setAddFolderHide] = useState(false);
  const [active, setActive] = useState('1');
  const [activecard, setActivecard] = useState('');

  // ** Toggle Compose Function
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    // if ((params.folder && params.folder === value) || (params.label && params.label === value)) {
    //   return true;
    // } else {
    //   return false;
    // }
  };

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <>
      <div className="overflow-hidden email-application">
        <div className="content-area-wrapper container-xxl p-0 animate__animated animate__fadeIn">
          <div
            className={classnames('sidebar-left', {
              show: sidebarOpen
            })}
          >
            <div className="sidebar">
              <div className="sidebar-content email-app-sidebar">
                <div className="email-app-menu">
                  <div className="form-group-compose text-center compose-btn">
                    <Addmyforms />
                  </div>
                  <PerfectScrollbar
                    className="sidebar-menu-list"
                    options={{ wheelPropagation: false }}
                  >
                    <ListGroup tag="div" className="list-group-messages">
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('1')}
                        active={active === '1'}
                        action
                      >
                        <Mail size={18} className="me-75" />
                        <span className="align-middle">My Form</span>
                      </ListGroupItem>
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('2')}
                        active={active === '2'}
                      >
                        <MessageCircle size={18} className="me-75" />
                        <span className="align-middle">My Task</span>
                      </ListGroupItem>
                    </ListGroup>
                    <h6 className="section-label mt-3 mb-1 px-2">Status</h6>
                    <ListGroup tag="div" className="list-group-labels">
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/personal"
                        // onClick={() => handleLabel('personal')}
                        active={handleActiveItem('personal')}
                        action
                      >
                        <span className="bullet bullet-sm bullet-warning me-1"></span>
                        Waiting
                        <Badge className="float-end" color="light-primary" pill>
                          {0}
                        </Badge>
                      </ListGroupItem>
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/company"
                        // onClick={() => handleLabel('company')}
                        active={handleActiveItem('company')}
                        action
                      >
                        <span className="bullet bullet-sm bullet-primary me-1"></span>
                        Viewed
                      </ListGroupItem>
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/important"
                        // onClick={() => handleLabel('important')}
                        active={handleActiveItem('important')}
                        action
                      >
                        <span className="bullet bullet-sm bullet-success me-1"></span>
                        Completed
                      </ListGroupItem>
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/private"
                        // onClick={() => handleLabel('private')}
                        active={handleActiveItem('private')}
                        action
                      >
                        <span className="bullet bullet-sm bullet-danger me-1"></span>
                        Expired
                      </ListGroupItem>
                    </ListGroup>
                    <div className="mt-3 px-2 d-flex justify-content-between">
                      <h6 className="section-label mb-1">Folders</h6>
                      <Plus
                        className="cursor-pointer"
                        size={14}
                        // onClick={() =>
                        //     setAddFolderHide(!addFolderHide)
                        // }
                      />
                    </div>
                    <ListGroup tag="div" className="list-group-labels">
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/personal"
                        // onClick={() => handleLabel('personal')}
                        active={handleActiveItem('personal')}
                        action
                      >
                        <Folder size={18} className="me-75" />
                        <span className="align-middle">Invoices</span>
                      </ListGroupItem>
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/company"
                        // onClick={() => handleLabel('company')}
                        active={handleActiveItem('company')}
                        action
                      >
                        <Folder size={18} className="me-75" />
                        <span className="align-middle">Contracts</span>
                      </ListGroupItem>
                    </ListGroup>
                  </PerfectScrollbar>
                </div>
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="app-user-list">
              <Row>
                {carddata?.map((item) => (
                  <Col lg="4" sm="6">
                    <div
                      className={`card border ${
                        activecard === item?.title ? 'border border-primary' : ''
                      }`}
                      onClick={() => {
                        setActivecard(item?.title);

                        // item?.title === 'Teakwondo' ? setTabledata([]) : setTabledata([]);
                      }}
                    >
                      <RolesCard
                        // togglemodal={toggleitemmodal}
                        title={item?.title}
                        subtitle1={item?.date}
                        subtitle2={item?.time}
                        des1={item?.rank}
                        des2={item?.type}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            <div className="content-body">
              <PerfectScrollbar>
                <TabContent activeTab={active}>
                  <TabPane tabId="1">
                    <div className="email-user-list">
                      <Card className="overflow-hidden">
                        <CardHeader>
                          <CardTitle className="w-100">
                            <div className="d-flex justify-content-between w-100">
                              <div>Employees Tasks {'> ' + activecard}</div>
                              <div>
                                <Button color="primary" onClick={toggleSidebar}>Add New Employee</Button>
                              </div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <div className="react-dataTable">
                          <DataTable
                            className="react-dataTable"
                            noHeader
                            pagination
                            selectableRows
                            columns={myFormData}
                            paginationPerPage={7}
                            sortIcon={<ChevronDown size={10} />}
                            data={data}
                          />
                        </div>
                      </Card>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="email-user-list">
                      <Card className="overflow-hidden">
                        <CardHeader>
                          <CardTitle className="w-100">
                            <div className="d-flex justify-content-between w-100">
                              <div>My Task</div>
                              <div>
                                <InputGroup className=" d-flex justify-content-end input-group-merge p-0">
                                  <Input
                                    type="text"
                                    placeholder="search..."
                                    style={{ padding: '5px' }}
                                  />
                                </InputGroup>
                              </div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <div className="react-dataTable">
                          <DataTable
                            noHeader
                            pagination
                            selectableRows
                            columns={myTask}
                            paginationPerPage={7}
                            className="react-dataTable"
                            sortIcon={<ChevronDown size={10} />}
                            data={mytask}
                          />
                        </div>
                      </Card>
                    </div>
                  </TabPane>
                </TabContent>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    </>
  );
};

export default MyFormlist;
