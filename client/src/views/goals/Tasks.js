// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png'

// ** Third Party Components
import classnames from 'classnames'
import { ReactSortable } from 'react-sortablejs'
import PerfectScrollbar from 'react-perfect-scrollbar'
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
} from 'react-feather'

// ** Components
import NewGoalWizard from './new-goal/NewGoalWizard'
import BoardGoals from './board-goals/BoardGoals'

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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss'

const Tasks = (props) => {
    // ** Props
    const {
        query,
        tasks,
        params,
        setSort,
        dispatch,
        getTasks,
        setQuery,
        updateTask,
        selectTask,
        reOrderTasks,
        handleTaskSidebar,
        handleMainSidebar
    } = props

    // ** States
    const [newGoalModal, setNewGoalModal] = useState(false)
    const [goalView, setGoalView] = useState('1')
    const [centeredModal, setCenteredModal] = useState(false)

    // ** Function to selectTask on click
    const handleTaskClick = (obj) => {
        dispatch(selectTask(obj))
        handleTaskSidebar()
    }

    // ** Returns avatar color based on task tag
    const resolveAvatarVariant = (tags) => {
        if (tags.includes('high')) return 'light-primary'
        if (tags.includes('medium')) return 'light-warning'
        if (tags.includes('low')) return 'light-success'
        if (tags.includes('update')) return 'light-danger'
        if (tags.includes('team')) return 'light-info'
        return 'light-primary'
    }

    // ** Renders task tags
    const renderTags = (arr) => {
        const badgeColor = {
            team: 'light-primary',
            low: 'light-success',
            medium: 'light-warning',
            high: 'light-danger',
            update: 'light-info'
        }

        return arr.map((item) => (
            <Badge
                className="text-capitalize"
                key={item}
                color={badgeColor[item]}
                pill
            >
                {item}
            </Badge>
        ))
    }

    // ** Renders Avatar
    const renderAvatar = (obj) => {
        const item = obj.assignee

        if (item.avatar === undefined || item.avatar === null) {
            return <Avatar img={blankAvatar} imgHeight="32" imgWidth="32" />
        } else if (item.avatar !== '') {
            return <Avatar img={item.avatar} imgHeight="32" imgWidth="32" />
        } else {
            return (
                <Avatar
                    color={resolveAvatarVariant(obj.tags)}
                    content={item.fullName}
                    initials
                />
            )
        }
    }

    // ** Render Goals
    const renderListGoals = () => {
        return (
            <PerfectScrollbar
                className="list-group todo-task-list-wrapper"
                options={{ wheelPropagation: false }}
                containerRef={(ref) => {
                    if (ref) {
                        ref._getBoundingClientRect = ref.getBoundingClientRect

                        ref.getBoundingClientRect = () => {
                            const original = ref._getBoundingClientRect()

                            return {
                                ...original,
                                height: Math.floor(original.height)
                            }
                        }
                    }
                }}
            >
                <h5 className="m-1">List Goals</h5>
                {tasks.length ? (
                    <ReactSortable
                        tag="ul"
                        list={tasks}
                        handle=".drag-icon"
                        className="todo-task-list media-list"
                        setList={(newState) => dispatch(reOrderTasks(newState))}
                    >
                        {tasks.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    onClick={() => handleTaskClick(item)}
                                    className={classnames('todo-item', {
                                        completed: item.isCompleted
                                    })}
                                >
                                    <div className="todo-title-wrapper">
                                        <div className="todo-title-area">
                                            <MoreVertical className="drag-icon" />
                                            <div className="form-check">
                                                <Input
                                                    type="checkbox"
                                                    id={item.title}
                                                    checked={item.isCompleted}
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    onChange={(e) => {
                                                        e.stopPropagation()
                                                        dispatch(
                                                            updateTask({
                                                                ...item,
                                                                isCompleted:
                                                                    e.target
                                                                        .checked
                                                            })
                                                        )
                                                    }}
                                                />
                                            </div>
                                            <span className="todo-title">
                                                {item.title}
                                            </span>
                                        </div>
                                        <div className="todo-item-action mt-lg-0 mt-50">
                                            {item.tags.length ? (
                                                <div className="badge-wrapper me-1">
                                                    {renderTags(item.tags)}
                                                </div>
                                            ) : null}
                                            {item.dueDate ? (
                                                <small className="text-nowrap text-muted me-1">
                                                    {new Date(
                                                        item.dueDate
                                                    ).toLocaleString(
                                                        'default',
                                                        { month: 'short' }
                                                    )}{' '}
                                                    {new Date(item.dueDate)
                                                        .getDate()
                                                        .toString()
                                                        .padStart(2, '0')}
                                                </small>
                                            ) : null}
                                            {item.assignee
                                                ? renderAvatar(item)
                                                : null}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ReactSortable>
                ) : (
                    <div className="no-results show">
                        <h5>No Items Found</h5>
                    </div>
                )}
            </PerfectScrollbar>
        )
    }
    const renderCalendarGoals = () => {
        return (
            <PerfectScrollbar
                className="list-group todo-task-list-wrapper"
                options={{ wheelPropagation: false }}
                containerRef={(ref) => {
                    if (ref) {
                        ref._getBoundingClientRect = ref.getBoundingClientRect

                        ref.getBoundingClientRect = () => {
                            const original = ref._getBoundingClientRect()

                            return {
                                ...original,
                                height: Math.floor(original.height)
                            }
                        }
                    }
                }}
            >
                <h5 className="m-1">Daily Goals</h5>

                {tasks.length ? (
                    <ReactSortable
                        tag="ul"
                        list={tasks}
                        handle=".drag-icon"
                        className="todo-task-list media-list"
                        setList={(newState) => dispatch(reOrderTasks(newState))}
                    >
                        {tasks.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    onClick={() => handleTaskClick(item)}
                                    className={classnames('todo-item', {
                                        completed: item.isCompleted
                                    })}
                                >
                                    <div className="todo-title-wrapper">
                                        <div className="todo-title-area">
                                            <MoreVertical className="drag-icon" />
                                            <span className="todo-title">
                                                {item.title}
                                            </span>
                                        </div>
                                        <div className="todo-item-action mt-lg-0 mt-50">
                                            {item.tags.length ? (
                                                <div className="badge-wrapper me-1">
                                                    {renderTags(item.tags)}
                                                </div>
                                            ) : null}
                                            {item.dueDate ? (
                                                <small className="text-nowrap text-muted me-1">
                                                    {new Date(
                                                        item.dueDate
                                                    ).toLocaleString(
                                                        'default',
                                                        { month: 'short' }
                                                    )}{' '}
                                                    {new Date(item.dueDate)
                                                        .getDate()
                                                        .toString()
                                                        .padStart(2, '0')}
                                                </small>
                                            ) : null}
                                            {item.assignee
                                                ? renderAvatar(item)
                                                : null}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ReactSortable>
                ) : (
                    <div className="no-results show">
                        <h5>No Items Found</h5>
                    </div>
                )}
            </PerfectScrollbar>
        )
    }

    // ** Function to getTasks based on search query
    const handleFilter = (e) => {
        setQuery(e.target.value)
        dispatch(getTasks(params))
    }

    // ** Function to getTasks based on sort
    const handleSort = (e, val) => {
        e.preventDefault()
        setSort(val)
        dispatch(getTasks({ ...params }))
    }

    return (
        <div className="todo-app-list">
            <div className="ps-1 bg-white d-flex align-items-center border-bottom">
                <h4 className="mb-0 me-2 d-flex align-items-center">Health</h4>

                <div className="d-flex align-items-center">
                    <Button
                        color="flat-primary"
                        onClick={() => setNewGoalModal(!newGoalModal)}
                    >
                        <Plus size={14} />
                        <span className="align-middle ms-25">
                            Create New Goal
                        </span>
                    </Button>
                    <Button color="flat-dark">
                        <Star size={14} />
                        <span className="align-middle ms-25">Favorite</span>
                    </Button>
                    <Button color="flat-dark">
                        <Copy size={14} />
                        <span className="align-middle ms-25">Duplicate</span>
                    </Button>
                    <Button color="flat-dark">
                        <Trash size={14} />
                        <span className="align-middle ms-25">Delete</span>
                    </Button>
                    <Button color="flat-dark">
                        <Info size={14} />
                        <span className="align-middle ms-25">Info</span>
                    </Button>
                    <Button color="flat-dark">
                        <Share2 size={14} />
                        <span className="align-middle ms-25">Share</span>
                    </Button>
                </div>

                {/* Create New Goal Modal */}
                <Modal
                    isOpen={newGoalModal}
                    toggle={() => setNewGoalModal(!newGoalModal)}
                    className="modal-dialog-centered"
                    size="lg"
                >
                    <ModalHeader toggle={() => setNewGoalModal(!newGoalModal)}>
                        Create A New Goal
                    </ModalHeader>
                    <ModalBody>
                        <NewGoalWizard />
                    </ModalBody>
                </Modal>
            </div>
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
                        <Input
                            placeholder="Search goal"
                            value={query}
                            onChange={handleFilter}
                        />
                    </InputGroup>
                </div>
                <div className="d-flex">
                    <Button.Ripple
                        className="btn-icon me-1"
                        outline
                        color="primary"
                        onClick={() => setGoalView('1')}
                    >
                        <List size={16} />
                    </Button.Ripple>
                    <Button.Ripple
                        className="btn-icon me-1"
                        outline
                        color="primary"
                        onClick={() => setGoalView('2')}
                    >
                        <Calendar size={16} />
                    </Button.Ripple>
                    <Button.Ripple
                        className="btn-icon me-1"
                        outline
                        color="primary"
                        onClick={() => setGoalView('3')}
                    >
                        <Columns size={16} />
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
                        <DropdownItem
                            tag={Link}
                            to="/"
                            onClick={(e) => handleSort(e, 'title-asc')}
                        >
                            Sort A-Z
                        </DropdownItem>
                        <DropdownItem
                            tag={Link}
                            to="/"
                            onClick={(e) => handleSort(e, 'title-desc')}
                        >
                            Sort Z-A
                        </DropdownItem>
                        <DropdownItem
                            tag={Link}
                            to="/"
                            onClick={(e) => handleSort(e, 'assignee')}
                        >
                            Sort Assignee
                        </DropdownItem>
                        <DropdownItem
                            tag={Link}
                            to="/"
                            onClick={(e) => handleSort(e, 'due-date')}
                        >
                            Sort Due Date
                        </DropdownItem>
                        <DropdownItem
                            tag={Link}
                            to="/"
                            onClick={(e) => handleSort(e, '')}
                        >
                            Reset Sort
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>

            <PerfectScrollbar
                className="list-group todo-task-list-wrapper bg-dark bg-opacity-10"
                options={{ wheelPropagation: false }}
            >
                {/* <BoardGoals /> */}
                {/* {renderListGoals()} */}
                {/* {renderCalendarGoals()} */}
                {goalView === '1' ? renderListGoals() : ''}
                {goalView === '2' ? renderCalendarGoals() : ''}
                {goalView === '3' ? <BoardGoals /> : ''}
            </PerfectScrollbar>
        </div>
    )
}

export default Tasks
