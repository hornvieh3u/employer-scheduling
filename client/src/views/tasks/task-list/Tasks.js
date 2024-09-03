// ** React Imports
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';

// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png';

// ** Third Party Components
import classnames from 'classnames';
import { ReactSortable } from 'react-sortablejs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Menu,
  Search,
  MoreVertical,
  Star,
  Copy,
  Trash,
  Info,
  Share2,
  Plus,
  Filter,
  Users,
  Columns,
  Calendar,
  List,
  CheckCircle
} from 'react-feather';

// ** Reactstrap Imports
import {
  Input,
  Button,
  Badge,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// ** Import Components
import Workspace from '../../apps/workspace/index';
import NewModal from './NewModal';

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss';

const TaskList = (props) => {
  // ** Props
  const {
    store,
    collapse,
    labelColors,
    dispatch,
    getTasks,
    updateTask,
    selectedWorkspace,
    selectTask,
    // reOrderTasks,
    handleTaskSidebar,
    handleMainSidebar,
    handleWorkspaceCollapse
  } = props;

  // ** States
  const [newGoalModal, setNewGoalModal] = useState(false);
  const [goalView, setGoalView] = useState('1');
  const [delBtnEnable, setDelBtnEnable] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [taskSearchResult, setTaskSearchResult] = useState([]);
  const [deleteTaskArr, setDeleteTaskArr] = useState([]);
  const [modalType, setModalType] = useState(0);

  const paramsURL = useParams();

  useEffect(() => {
    setTaskSearchResult(store.tasks);
  }, [store]);

  var params = {
    filter: paramsURL.filter || '',
    q: '',
    sortBy: '',
    tag: paramsURL.tag || ''
  };

  // ** Function to selectTask on click
  const handleTaskClick = (obj) => {
    dispatch(selectTask(obj));
    handleTaskSidebar();
  };

  const renderAssignee = (row) => {
    let tmpValue = 0;
    Array.from(row.title).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    return (
      <div className="own-avatar">
        {row.title ? (
          <UncontrolledTooltip placement={row.placement} target={row.title.split(' ').join('-')}>
            {row.title}
          </UncontrolledTooltip>
        ) : null}
        {row?.img ? (
          <Avatar
            className={classnames('pull-up', {
              [row.className]: row.className
            })}
            img={row.img}
            width="32"
            height="32"
            {...(row.title ? { id: row.title.split(' ').join('-') } : {})}
          />
        ) : (
          <Avatar
            color={color || 'primary'}
            className={classnames('pull-up', {
              [row.className]: row.className
            })}
            content={row.title || 'John Doe'}
            {...(row.title ? { id: row.title.split(' ').join('-') } : {})}
            width="32"
            height="32"
            initials
          />
        )}
      </div>
    );
  };

  const renderAssignees = (data) => {
    return <div className="own-avatar-group">{data.map((row) => renderAssignee(row))}</div>;
  };

  const updateTaskSelection = (data) => {
    const { isChecked, _id, title } = data;
    if (isChecked) {
      let tmpArr1 = deleteTaskArr;
      tmpArr1.push({
        id: _id,
        title: title
      });
      console.log(tmpArr1);
      if (tmpArr1.length > 0) {
        setDelBtnEnable(true);
      }
      setDeleteTaskArr(tmpArr1);
    } else {
      let tmpArr2 = deleteTaskArr.filter((x) => x.id !== _id);
      console.log(tmpArr2);
      if (tmpArr2.length < 1) {
        setDelBtnEnable(false);
      }
      setDeleteTaskArr(tmpArr2);
    }
  };

  // ** Renders task tags
  const renderTags = (arr) => {
    // const labelColors = {
    //   App: 'info',
    //   UX: 'success',
    //   Images: 'warning',
    //   Forms: 'success',
    //   'Code Review': 'danger',
    //   'Charts & Maps': 'primary'
    // };

    return arr.map((item) => (
      <Badge className="text-capitalize" key={item} color={labelColors[item]} pill>
        {item}
      </Badge>
    ));
  };

  // ** Search Tasks
  const taskSearch = (searchParams) => {
    let resultData = taskSearchResult;
    if (searchParams.q) {
      resultData = taskSearchResult.filter((x) => {
        let searchTxt = `${x.title}${x.description}${x.labels}`;
        x.assignedTo.forEach((element) => {
          searchTxt += element.title;
        });
        return searchTxt.toLowerCase().indexOf(searchParams.q) > -1;
      });
    }
    setTaskSearchResult(resultData);
  };

  // ** Renders Avatar
  const renderAvatar = (obj) => {
    const item = obj.assignedTo;

    return item.length ? (
      renderAssignees(item)
    ) : (
      <Avatar img={blankAvatar} imgHeight="32" imgWidth="32" />
    );
  };

  // ** Render Goals
  const renderListTasks = () => {
    return (
      <PerfectScrollbar
        className="list-group task-task-list-wrapper"
        options={{ wheelPropagation: false }}
        containerRef={(ref) => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect;

            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect();

              return {
                ...original,
                height: Math.floor(original.height)
              };
            };
          }
        }}
      >
        {taskSearchResult.length ? (
          <ReactSortable
            tag="ul"
            list={taskSearchResult}
            handle=".drag-icon"
            className="task-task-list media-list"
            setList={(newState) => handleSetList(newState)}
            overFlow="auto"
          >
            {taskSearchResult.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => handleTaskClick(item)}
                  className={classnames('task-item', {
                    completed: item.isCompleted
                  })}
                >
                  <div className="task-title-wrapper">
                    <div className="task-title-area">
                      <MoreVertical className="drag-icon" />
                      <div className="form-check">
                        <Input
                          type="checkbox"
                          id={item.title}
                          checked={item.isCompleted}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            updateTaskSelection({
                              ...item,
                              isChecked: e.target.checked
                            });
                          }}
                        />
                      </div>
                      <span className="task-title">{item.title}</span>
                    </div>
                    <div className="task-item-action mt-lg-0 mt-50">
                      {item.labels.length ? (
                        <div className="badge-wrapper me-1">{renderTags(item.labels)}</div>
                      ) : null}
                      {item.dueDate ? (
                        <small className="text-nowrap text-muted me-1">
                          {new Date(item.dueDate).toLocaleString('default', { month: 'short' })}{' '}
                          {new Date(item.dueDate).getDate().toString().padStart(2, '0')}
                        </small>
                      ) : null}
                      {item.assignedTo ? renderAvatar(item) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ReactSortable>
        ) : (
          <div className="no-results show">
            <h5>No Items Found</h5>
          </div>
        )}
      </PerfectScrollbar>
    );
  };

  // ** Function to taskSearch based on search query
  const handleFilter = (e) => {
    setQuery(e.target.value);
    params.q = e.target.value;
    params.sortBy = sort;
    taskSearch(params);
  };

  // ** Function to taskSearch based on sort
  const handleSort = (e, val) => {
    e.preventDefault();
    setSort(val);
    params.query = query;
    params.sortBy = val;
    taskSearch(params);
  };

  const handleSetList = (e) => {
    console.log(e);
  };

  return (
    <div className="task-app-list">
      <div className="app-fixed-search d-flex align-items-center">
        <div
          className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1"
          onClick={handleMainSidebar}
        >
          <Menu size={21} />
        </div>
        <div className="d-flex align-content-center justify-content-between w-100">
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input placeholder="Search Task" value={query} onChange={handleFilter} />
          </InputGroup>
        </div>
        <div className="d-flex">
          <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={() => setModalType(1)}
          >
            <Columns size={16} />
          </Button.Ripple>
          <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={() => setModalType(2)}
            disabled={!store.boards.length}
          >
            <Plus size={16} />
          </Button.Ripple>
          <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={() => setModalType(3)}
            disabled={!delBtnEnable}
          >
            <Trash size={16} />
          </Button.Ripple>
          <Button color="flat-dark" className="d-flex">
            <Filter size={14} />
            <span className="align-middle ms-25">Filters</span>
          </Button>
          <Button color="flat-dark" className="d-flex">
            <Users size={14} />
            <span className="align-middle ms-25">Assignee</span>
          </Button>
        </div>
        <NewModal
          store={store}
          dispatch={dispatch}
          modalType={modalType}
          deleteTaskArr={deleteTaskArr}
          setDeleteTaskArr={setDeleteTaskArr}
          setModalType={setModalType}
        />
        <UncontrolledDropdown>
          <DropdownToggle
            className="hide-arrow me-1"
            tag="a"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <MoreVertical className="text-body" size={16} />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'title-asc')}>
              Sort A-Z
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'title-desc')}>
              Sort Z-A
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'assignee')}>
              Sort Assignee
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'due-date')}>
              Sort Due Date
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, '')}>
              Reset Sort
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>

      <PerfectScrollbar
        className="list-group task-list-wrapper bg-dark bg-opacity-10"
        options={{ wheelPropagation: false }}
      >
        {goalView === '1' ? renderListTasks() : ''}
      </PerfectScrollbar>
    </div>
  );
};

export default TaskList;
