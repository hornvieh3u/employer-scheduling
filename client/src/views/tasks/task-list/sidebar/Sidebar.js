// ** React Imports
import { useState, Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { Plus } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import { isEmptyObject } from 'jquery';
// import { Briefcase, UserCheck } from 'react-feather';

// ** Components
// import ImpactArea from './ImpactArea';
// import Filters from './Filters';
// import Tags from './Tags';

// ** Reactstrap Imports
import {
  Button,
  Input,
  ListGroup,
  ListGroupItem
  // Accordion,
  // AccordionBody,
  // AccordionHeader,
  // AccordionItem
} from 'reactstrap';

import { handleSelectWorkspace } from '../../../apps/workspace/store';

const defaultValues = {
  workspaceTitle: ''
};

const WorkspaceSidebar = (props) => {
  // ** Props
  const {
    store,
    handleTaskSidebar,
    setMainSidebar,
    mainSidebar,
    dispatch,
    getTasks,
    params,
    getWorkspaces,
    addWorkspace
  } = props;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });
  const [showAddworkspace, setShowAddWorkspace] = useState(false);

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

  // ** Functions To Handle Add Task Click
  // const handleAddClick = () => {
  //   handleTaskSidebar();
  //   setMainSidebar();
  // };

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

  const handleAddWorkspaceReset = () => {
    reset();
    setShowAddWorkspace(false);
  };

  const handleOpenAddWorkspace = () => {
    reset();
    setShowAddWorkspace(true);
  };

  const handleAddWorkspaceFormSubmit = (data) => {
    const param = { title: data.workspaceTitle };
    dispatch(addWorkspace(param));
    handleAddWorkspaceReset();
  };

  const renderAddWorkspaceForm = () => {
    return showAddworkspace ? (
      <form onSubmit={handleSubmit(handleAddWorkspaceFormSubmit)}>
        <div className="mb-1">
          <Controller
            name="workspaceTitle"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                autoFocus
                rows="2"
                value={value}
                type="textarea"
                id="workspace-title"
                onChange={onChange}
                placeholder="Add Content"
                invalid={errors.workspaceTitle && true}
                aria-describedby="validation-add-workspace"
              />
            )}
          />
          {errors.workspaceTitle && (
            <FormText color="danger" id="validation-add-workspace">
              Please enter a valid Workspace Title
            </FormText>
          )}
        </div>
        <div>
          <Button color="primary" size="sm" type="submit" className="me-75">
            Add
          </Button>
          <Button outline size="sm" color="secondary" onClick={handleAddWorkspaceReset}>
            Cancel
          </Button>
        </div>
      </form>
    ) : null;
  };

  const handleWorkspaceClick = (workspace, event) => {
    dispatch(handleSelectWorkspace(workspace));
  };

  return (
    <div
      className={classnames('sidebar-left', {
        show: mainSidebar === true
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content task-sidebar">
          <div className="task-app-menu">
            <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <div className="p-1">
                <h4>Workspaces</h4>
              </div>
              {store.workspace.map((workspace, index) => {
                return (
                  <ListGroupItem
                    active={store.selectedWorkspace.title === workspace.title ? true : false}
                    onClick={() => handleWorkspaceClick(workspace)}
                    action
                  >
                    {workspace.title}
                  </ListGroupItem>
                );
              })}
              {!showAddworkspace ? (
                <Button size="sm" color="flat-secondary" onClick={handleOpenAddWorkspace}>
                  <Plus size={14} className="me-25" />
                  <span className="align-middle">Add New Workspace</span>
                </Button>
              ) : (
                renderAddWorkspaceForm()
              )}
            </ListGroup>
            {/* <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              {renderGoalsType()}
              <Accordion className="me-1" open={openAccordion} toggle={toggleAccordion}>
                <AccordionItem>
                  <AccordionHeader targetId="1">Impact Areas</AccordionHeader>
                  <AccordionBody accordionId="1">
                    <ImpactArea />
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="2">Filters</AccordionHeader>
                  <AccordionBody accordionId="2">
                    <Filters activeItem={handleActiveItem} />
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="3">Tags</AccordionHeader>
                  <AccordionBody accordionId="3">
                    <Tags activeItem={handleActiveItem} />
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            </PerfectScrollbar> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
