/* eslint-disable no-unused-vars */
// ** React Imports
import { useState, useEffect } from 'react';
import { NavLink, TabContent, TabPane,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, Menu, Package, Users, TrendingUp, GitMerge, User, MoreVertical, Edit, Delete, Folder } from 'react-feather';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DataTable from 'react-data-table-component';


// store
import { getFormData, deleteForm } from '../store';
import { getUserData } from '../../../utility/Utils';

const Sidebar = (props) => { 
  // dispatch
  const dispatch = useDispatch();

  // store
  const store = useSelector((state) => state.formBuilder);

  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  // const [tableData, settableData] = useState(store.forms);
  const [active, setActive] = useState('6');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  
  let data;
  useEffect(() => {
    data = dispatch(
        getFormData({
          id: getUserData().id
        }
        )
    )
  },[]);
  
  const columns = [
    {
      name: 'Type',
      selector: (row) => row.name
    },
    {
      name: 'Form',
      selector: (row) => row.formType,
      sortable: true,
    },
    {
      name: 'Steps',
      selector: (row) => row.subCategory
    },

    {
      name: 'Smartlist Tags',
      selector: (row) => row.smartList
    },
    {
      name: 'Last Update',
      selector: (row) => row.created_at,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem tag={Link} to={`/formBuilder/createDetail/${row._id}`} className="w-100" >
                  <Edit size={14} className="me-50" />
                  <span className="align-middle">Edit</span>
                </DropdownItem>
              <DropdownItem tag={Link} to="/formBuilder" className="w-100" 
              onClick={
                ()=> dispatch(deleteForm({formId: row._id}))
              }>
                <Delete size={14} className="me-50" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

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
                <Link to="">
                  <Button
                      className="compose-email"
                      color="primary"
                      block
                      tag={Link}
                      to="/formBuilder/createForm"
                  >
                      Create Form
                  </Button>
                </Link>
                </div>
                <ListGroup tag="div" className="list-group-labels">
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('6')}
                    active={active === '6'}
                  >
                    <Users size={18} className="me-75" />
                    <span className="align-middle"></span>
                    My Form
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('7')}
                    active={active === '7'}
                  >
                    <TrendingUp size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Favorite
                  </ListGroupItem>

                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('9')}
                    active={active === '9'}
                  >
                    <GitMerge size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Archive
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('10')}
                    active={active === '10'}
                  >
                    <Package size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Trash
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
                <DataTable
                  noHeader
                  responsive
                  columns={columns}
                  data={store.forms}
                  className="react-dataTable"
                />
                </TabPane>
                <TabPane tabId="7">
                  {/* <DataTable
                    noHeader
                    responsive
                    columns={columns}
                    data={store.forms}
                    className="react-dataTable"
                  />*/}
                </TabPane> 

                <TabPane tabId="9">
                  {/* <DataTable
                    noHeader
                    responsive
                    columns={columns}
                    data={store.forms}
                    className="react-dataTable"
                  /> */}
                </TabPane>
                <TabPane tabId="10">
                  {/* <DataTable
                    noHeader
                    responsive
                    columns={columns}
                    data={store.forms}
                    className="react-dataTable"
                  /> */}
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
