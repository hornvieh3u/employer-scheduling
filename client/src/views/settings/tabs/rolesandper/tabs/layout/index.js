// ** React Imports
import { Fragment, useState, useRef, useEffect } from 'react';

// ** Custom Components
import AvatarGroup from '@components/avatar-group';
import { toast } from 'react-toastify';
// ** User List Component
import DataTable from 'react-data-table-component';
import { MoreVertical, Edit, Eye, Trash } from 'react-feather';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import EmployeeTaskView from './component/ModalView';
import Avatar from '../../../../../components/avatar';
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Form,
  ListGroup,
  ListGroupItem,
  Input
} from 'reactstrap';
// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';
import progressionimage from './belt.png';
import { useSelector, useDispatch } from 'react-redux';
import { rolesFetchAction,rolesEditAction, rolesAddAction, rolesDeleteAction } from '../../store/actions';

const Layout = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.roles);
  const rolesList = store?.rolesList;
  const [deleteModal, setDeleteModal] = useState({ show: false, id: '' });
  const projectsArr = [
    {
      progress: 'Type A',
      programme: 'Form 1',
      progressColor: 'info',
      totalTasks: '01/01/2023',
      subtitle: 'React Project',
      title: 'BGC eCommerce App',
      img: progressionimage
    }
  ];
  const columns = [
    {
      name: 'Form Name',
      selector: (row) => row.programme
    },
    {
      name: 'Type',
      selector: (row) => row.progress,
      sortable: true,

      selector: (row) => row.progress
    },
    {
      name: 'Last Updated',
      selector: (row) => row.totalTasks
    },

    {
      name: 'Status',
      selector: (row) => row.totalTasks
    },
    {
      name: 'View',
      selector: (row) => row.totalTasks,
      cell: (row) => <Eye></Eye>
    },
    {
      name: 'Take Action',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="span" className="w-100">
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  const hiddenFileInput = useRef();
  const [activecard, setActivecard] = useState();
  const [itemmodal, setItemmodal] = useState(false);
  const [open, setopen] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const toggle = () => {
    setopen(!open);
  };
  const [permissions, setPermissions] = useState({ dashboard: false });
  const [permissionName, setPermissionName] = useState();
  const[editable,setEditable]=useState({id:"",status:false});
  const[disabled,setDisabled]=useState(false);

  const handlePermissionInput = (e) => {
    setPermissions({ ...permissions, [e.target.name]: e.target.checked });
  };
  const handlePermissionInputRoleName = (e) => {
    setPermissionName(e.target.value);
  };
  const handlePermissionSubmit = (e) => {
    e.preventDefault();
    let permissionArray = [];
    let finalPayload = {};
    permissionArray = [permissions];
    finalPayload = { roleName: permissionName, permissions: permissionArray };
    editable.status?dispatch(rolesEditAction(finalPayload,editable?.id)):dispatch(rolesAddAction(finalPayload))
    // dispatch(rolesAddAction(finalPayload));
    setPermissions({ dashboard: false });
    setPermissionName();
    toggleitemmodal();
  };
  const handleDeleteRequest = (e) => {
    e.preventDefault();
    dispatch(rolesDeleteAction(deleteModal.id));
    setDeleteModal({ show: false });
  };
  const avatarGroupArr = [
    {
      imgWidth: 25,
      imgHeight: 25,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
    }
  ];
  useEffect(() => {
    dispatch(rolesFetchAction());
  }, []);
  useEffect(() => {
    if (store?.rolesAddSuccess) {
      toast.success('Role Added Successfully');
    }
    if (store?.rolesDeleteSuccess) {
      toast.success('Role Deleted Successfully');
    }
    if (store?.rolesEditSuccess) {
      toast.success('Role Updated');
    }
  }, [store?.rolesDeleteSuccess, store?.rolesAddSuccess,store?.rolesEditSuccess]);

  return (
    <div className="m-1">
      <div className="">
        <Modal
          centered={true}
          isOpen={deleteModal?.show}
          toggle={() => setDeleteModal({ show: !deleteModal?.show })}
          size="md"
        >
          <Form onSubmit={handleDeleteRequest} encType="multipart/form-data">
            <ModalHeader toggle={() => setDeleteModal({ show: !deleteModal?.show })}>
              Delete {deleteModal?.roleName}{' '}
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <h4>Are you Sure to Delete {deleteModal?.roleName}?</h4>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="btn btn-outline-danger"
                onClick={() => setDeleteModal({ show: !deleteModal?.show })}
              >
                Cancel
              </Button>{' '}
              <Button type="submit" color="btn btn-danger">
                Delete
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="md">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <Form onSubmit={handlePermissionSubmit} className="p-2">
            <ModalBody>
              <FormGroup>
                <Label for="userRole">Role</Label>
                <Input
                  id="userRole"
                  value={permissionName}
                  onChange={handlePermissionInputRoleName}
                  name="roleName"
                  placeholder="Please Enter Role Name"
                  type="text"
                  required
                  disabled={disabled}
                />
              </FormGroup>
              <h3>{editable.status?"Edit Role Permission":"Role Permission"}</h3>
              <Row>
                <ListGroup flush>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="dashboard"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.dashboard}
                      />
                      <Label check>Dashboard</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="contacts"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.contacts}
                      />
                      <Label check>Contacts</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="taskAndGoals"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.taskAndGoals}
                      />
                      <Label check>Task and Goals</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="calendar"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.calendar}
                      />
                      <Label check>Calendar</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="document"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.document}
                      />
                      <Label check>Documents</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="marketing"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.marketing}
                      />
                      <Label check>Marketing</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="shop"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.shop}
                      />
                      <Label check>Shop</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="myBusiness"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.myBusiness}
                      />
                      <Label check>My Business</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="finance"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.finance}
                      />
                      <Label check>Finance</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="fileManager"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.fileManager}
                      />
                      <Label check>File Manager</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="settings"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.settings}
                      />
                      <Label check>Settings</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="myCMA"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.myCMA}
                      />
                      <Label check>myCMA</Label>
                    </FormGroup>
                  </ListGroupItem>
                </ListGroup>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
                Cancle
              </Button>{' '}
              <Button color="btn btn-primary" type="submit" disabled={disabled}>
                {editable.status?"Save Edit":"Save New Role"}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
      <Fragment>
        <div className="app-user-list">
          <Row>
            {rolesList?.map((item, i) => (
              <>
                <Col lg="4" sm="6">
                  <div
                    className={`card border ${activecard === i ? 'border border-primary' : ''}`}
                    onClick={() => {
                      setActivecard(i);
                      setPermissionName(item?.roleName);
                      setPermissions(item.permissions[0]);
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <AvatarGroup data={avatarGroupArr} size="sm" />
                        <div className="d-flex justify-content-between">
                          <div></div>
                          <div>
                            <h3>{item?.roleName}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <div></div>
                        <div classname="d-flex justify-content-between">
                          <span
                            className="text-primary m-1 cursor-pointer"
                            onClick={()=>{toggleitemmodal();setDisabled(true)}}
                          >
                            View
                          </span>
                          <span className="text-danger cursor-pointer">
                            <Trash
                              onClick={() => {
                                setDeleteModal({
                                  show: !deleteModal.show,
                                  id: item?._id,
                                  roleName: item?.roleName
                                });
                              }}
                              size={15}
                            ></Trash>
                            <Edit  onClick={()=>{toggleitemmodal();setDisabled(false);setEditable({id:item?._id,status:true})}} size={15} className='ms-1' />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            ))}
            <Col lg="4">
              <div className="card p-1">
                <Button
                  className="m-1"
                  onClick={() => {
                    toggleitemmodal();
                    setPermissions({dashboard:false});
                    setPermissionName();
                    setDisabled(false);
                    setEditable({...editable,status:false});
                  }}
                  color="primary"
                >
                  Add Role
                </Button>
              </div>
            </Col>
            {/* <Col xl="12" className="d-flex justify-content-end">
              <Button onClick={toggleitemmodal} color="primary " className="mb-1">
                Add New Role
              </Button >
            </Col> */}
          </Row>
        </div>
      </Fragment>
      <Col xl={12}>
        <div className="react-dataTable user-view-account-projects">
          <div className="card m-0 rounded-0 p-2">
            <div className="d-flex justify-content-between">
              <div>Employee Tasks{' > ' + activecard}</div>
              <Button color="primary" onClick={toggle}>
                Add Task
              </Button>
              {/* <input type="file" hidden ref={hiddenFileInput}></input> */}
            </div>
          </div>
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={projectsArr}
            className="react-dataTable"
          />
        </div>
      </Col>
      <Modal
        isOpen={open}
        toggle={() => setopen(!open)}
        fullscreen="lg"
        size="lg"
        centered="true"
        scrollable="false"
      >
        <ModalHeader toggle={() => setopen(!open)}>Add Employee Task</ModalHeader>
        <ModalBody style={{ padding: 0 }}>
          <EmployeeTaskView />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Layout;
