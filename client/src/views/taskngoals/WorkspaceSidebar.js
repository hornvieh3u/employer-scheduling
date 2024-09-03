// ** React Imports
import { useState, Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Columns,
  MoreHorizontal,
  Edit,
  Trash
} from 'react-feather';

import { useForm, Controller } from 'react-hook-form';
import { isEmptyObject } from 'jquery';
// import { Briefcase, UserCheck } from 'react-feather';

// ** Reactstrap Imports
import {
  Button,
  FormFeedback,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import {
  getSelectedWorkspaceData,
  handleSelectWorkspace,
  deleteWorkspace
} from '../apps/workspace/store';
import { sortedUniq } from 'pdf-lib';
import NewModal from './NewModal';

const defaultValues = {
  workspaceTitle: ''
};

const WorkspaceSidebar = (props) => {
  // ** Props
  const { store, dispatch, collapse, params, addWorkspace, handleWorkspaceCollapse } = props;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });
  const [showAddworkspace, setShowAddWorkspace] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState(false);
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [newWSTitle, setNewWSTitle] = useState('');
  const [style, setStyle] = useState({ display: 'none' });
  const [modalType, setModalType] = useState(0);

  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData) {
    return;
  }
  const WorkspaceSidebarName = `${userData.fullName}\nWorkspaces`;
  // ** States
  // const [openAccordion, setOpenAccordion] = useState('1');

  // const toggleAccordion = (id) => {
  //   openAccordion === id ? setOpenAccordion() : setOpenAccordion(id);
  // };

  // ** Functions To Handle List Item Filter
  const handleFilter = (filter) => {
    // dispatch(getTasks({ ...params, filter }));
  };

  // const handleTag = (tag) => {
  //   dispatch(getTasks({ ...params, tag }));
  // };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if ((params.filter && params.filter === value) || (params.tag && params.tag === value)) {
      return true;
    } else {
      return false;
    }
  };

  // const renderGoalsType = () => {
  //   return (
  //     <Fragment>
  //       <ListGroup tag="div" className="list-group-filters mb-1">
  //         <ListGroupItem
  //           action
  //           tag={Link}
  //           to={'/goals'}
  //           active={params.filter === '' && params.tag === ''}
  //           onClick={() => handleFilter('')}
  //         >
  //           <UserCheck className="me-75" size={18} />
  //           <span className="align-middle">Personal</span>
  //         </ListGroupItem>
  //         <ListGroupItem
  //           tag={Link}
  //           to={'/goals'}
  //           active={handleActiveItem('important')}
  //           onClick={() => handleFilter('important')}
  //           action
  //         >
  //           <Briefcase className="me-75" size={18} />
  //           <span className="align-middle">Business</span>
  //         </ListGroupItem>
  //       </ListGroup>
  //     </Fragment>
  //   );
  // };

  const handleOpenAddWorkspace = (e) => {
    e.preventDefault();
    setNewWorkspace(true);
  };

  const handleAddWorkspaceFormSubmit = (e) => {
    e.preventDefault();
    const param = { title: newWSTitle, userId: userData?.id };
    dispatch(addWorkspace(param));
    setNewWorkspace(false);
  };

  const handleWorkspaceClick = (workspace, e) => {
    dispatch(getSelectedWorkspaceData(workspace._id));
    dispatch(handleSelectWorkspace(workspace));
  };

  const handleNewWorkspaceTitle = (e) => {
    e.preventDefault();
    setNewWSTitle(e.target.value);
    setCreateNewValidation(store.workspace.filter((x) => x.title === e.target.value).length === 0);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content task-sidebar">
        <div className="task-app-menu">
          <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
            <div className="p-1 d-flex justify-content-between align-items-center">
              <div style={{ fontSize: '20px', fontWeight: 800 }}>{WorkspaceSidebarName}</div>
              <Button className="btn-icon" color="flat-dark" onClick={handleWorkspaceCollapse}>
                {collapse ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </Button>
            </div>

            {store.workspace.map((workspace, index) => {
              return (
                <ListGroupItem
                  key={index}
                  active={store.selectedWorkspace.title === workspace.title ? true : false}
                  onClick={() => handleWorkspaceClick(workspace)}
                  action
                  onMouseEnter={(e) => {
                    setStyle({
                      display: 'block'
                    });
                  }}
                  onMouseLeave={(e) => {
                    setStyle({
                      display: 'none'
                    });
                  }}
                >
                  <div className="d-flex justify-content-between align-middle">
                    <div className="ws-name">
                      <span>{workspace.title}</span>
                    </div>
                    <div style={style}>
                      <div className="d-flex align-items-center">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="icon-btn hide-arrow m-0 p-0"
                            color="transparent"
                            size="sm"
                            caret
                          >
                            <MoreHorizontal size={18} />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              href="/"
                              onClick={(e) => {
                                e.preventDefault();
                                setModalType(1);
                              }}
                            >
                              <Columns className="me-50" size={15} />{' '}
                              <span className="align-middle">Add Board</span>
                            </DropdownItem>
                            <DropdownItem
                              href="/"
                              onClick={(e) => {
                                e.preventDefault();
                                setModalType(2);
                              }}
                              disabled={!store.boards.length}
                            >
                              <Plus className="me-50" size={15} />{' '}
                              <span className="align-middle">Add Task</span>
                            </DropdownItem>
                            <DropdownItem
                              href="/"
                              onClick={(e) => {
                                e.preventDefault();
                                setModalType(4);
                              }}
                            >
                              <Trash className="me-50" size={15} />{' '}
                              <span className="align-middle">Delete</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
            <div className="create-workspace-btn mt-1">
              <Button color="primary" block outline onClick={handleOpenAddWorkspace}>
                <Plus size={14} className="me-25" />
                New Workspace
              </Button>
            </div>
          </ListGroup>
        </div>
        <Modal
          isOpen={newWorkspace}
          toggle={() => setNewWorkspace(!newWorkspace)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setNewWorkspace(!newWorkspace)}>
            Create A New Workspace
          </ModalHeader>
          <ModalBody>
            <div>
              <Label className="form-label" for="validState">
                Workspace title
              </Label>
              <Input
                type="text"
                id="newWorkspaceTitle"
                name="newWorkspaceTitle"
                placeholder="My Workspace"
                onChange={handleNewWorkspaceTitle}
                valid={createNewValidation}
                invalid={!createNewValidation}
              />
              <FormFeedback valid={createNewValidation}>
                {createNewValidation
                  ? 'Sweet! That name is available.'
                  : 'Oh no! That name is already taken.'}
              </FormFeedback>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={handleAddWorkspaceFormSubmit}
              disabled={!createNewValidation || !newWSTitle}
            >
              Create
            </Button>
            <Button color="secondary" onClick={() => setNewWorkspace(!newWorkspace)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <NewModal
          key={Math.random() * 1000}
          store={store}
          dispatch={dispatch}
          modalType={modalType}
          setModalType={setModalType}
          deleteWorkspace={deleteWorkspace}
        />
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
