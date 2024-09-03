// ** React Imports
import { useState, Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { Plus, ChevronLeft, ChevronRight } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import { isEmptyObject } from 'jquery';
// import { Briefcase, UserCheck } from 'react-feather';
import { Editor } from 'react-draft-wysiwyg';
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import {
  Button,
  FormFeedback,
  Input,
  Form,
  Row,
  Col,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { selectThemeColors } from '@utils';

import { getSelectedWorkspaceData, handleSelectWorkspace } from '../apps/workspace/store';
import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg';
import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg';
import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg';
import img6 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { EditorState } from 'draft-js';
import Flatpickr from 'react-flatpickr';
import Select, { components } from 'react-select';
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import { sortedUniq } from 'pdf-lib';
import NewGoalWizard from './new-goal/NewGoalWizard';

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
  const [goalsType, setGoalsType] = useState('Personal');
  const [newWorkspace, setNewWorkspace] = useState(false);
  const [openCreateGoal, setOpenCreateGoal] = useState(false);
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [newWSTitle, setNewWSTitle] = useState('');
  const [assignee, setAssignee] = useState({
    value: 'pheobe',
    label: 'Pheobe Buffay',
    img: img1
  });
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState(EditorState.createEmpty());
  const [dueDate, setDueDate] = useState(new Date());
  // ** Assignee Select Options
  const assigneeOptions = [
    { value: 'pheobe', label: 'Pheobe Buffay', img: img1 },
    { value: 'chandler', label: 'Chandler Bing', img: img2 },
    { value: 'ross', label: 'Ross Geller', img: img3 },
    { value: 'monica', label: 'Monica Geller', img: img4 },
    { value: 'joey', label: 'Joey Tribbiani', img: img5 },
    { value: 'Rachel', label: 'Rachel Green', img: img6 }
  ];

  // ** Tag Select Options
  const tagOptions = [
    { value: 'team', label: 'Team' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'update', label: 'Update' }
  ];
  // ** Custom Assignee Component
  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <img
            className="d-block rounded-circle me-50"
            src={data.img}
            height="26"
            width="26"
            alt={data.label}
          />
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };
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
  const handleGoalsType = (type) => {
    setGoalsType(type);
  };
  const handleOpenAddWorkspace = () => {
    setNewWorkspace(true);
  };

  const handleAddWorkspaceFormSubmit = (data) => {
    const param = { title: newWSTitle };
    dispatch(addWorkspace(param));
    setNewWorkspace(false);
  };

  const handleWorkspaceClick = (workspace, event) => {
    dispatch(getSelectedWorkspaceData(workspace._id));
    dispatch(handleSelectWorkspace(workspace));
  };

  const handleNewWorkspaceTitle = (e) => {
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
            <div className="px-1 my-1">
              <Button className="w-100" onClick={() => setOpenCreateGoal(true)} color="primary">
                <Plus size={14} className="me-25" />
                Create Goal
              </Button>
            </div>
            {/* {store.workspace.map((workspace, index) => {
              return (
                <ListGroupItem
                  key={index}
                  active={store.selectedWorkspace.title === workspace.title ? true : false}
                  onClick={() => handleWorkspaceClick(workspace)}
                  action
                >
                  {workspace.title}
                </ListGroupItem>
              );
            })} */}
            <ListGroupItem
              // key={index}
              active={goalsType === 'Personal' ? true : false}
              onClick={() => handleGoalsType('Personal')}
              action
            >
              {'Personal'}
            </ListGroupItem>
            <ListGroupItem
              // key={index}
              active={goalsType === 'Business' ? true : false}
              onClick={() => handleGoalsType('Business')}
              action
            >
              {'Business'}
            </ListGroupItem>
            <ListGroupItem
              // key={index}
              active={goalsType === 'Others' ? true : false}
              onClick={() => handleGoalsType('Others')}
              action
            >
              {'Others'}
            </ListGroupItem>
            <div className="px-1 mt-1">
              <Button color="primary" block outline onClick={handleOpenAddWorkspace}>
                <Plus size={14} className="me-25" />
                Create New Workspace
              </Button>
            </div>
            <div className="mt-1 px-1">
              <Label>Status</Label>
              <Input type="select">
                <option>In Progress</option>
                <option>Completed</option>
                <option>Due</option>
              </Input>
            </div>
          </ListGroup>
        </div>
        <Modal
          isOpen={openCreateGoal}
          toggle={() => setOpenCreateGoal(false)}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalHeader toggle={() => setOpenCreateGoal(false)}>Create A New Goal</ModalHeader>
          <ModalBody>
            <NewGoalWizard />
          </ModalBody>
        </Modal>
        {/* <Modal
          isOpen={openCreateGoal}
          toggle={() => setNewGoalModal(false)}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalHeader toggle={() => setNewGoalModal(false)}>
            Create A New Goal
          </ModalHeader>
          <ModalBody>
            <NewGoalWizard />
          </ModalBody>
        </Modal> */}
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
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
