// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** Reactstrap Imports
import { Input,Row, Col, Button, FormText, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

// ** Third Party Imports
import { ReactSortable } from 'react-sortablejs'
import { useForm, Controller } from 'react-hook-form'
import { Plus, MoreVertical } from 'react-feather'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'


import KanbanContacts from './KanbanContacts'
import {updateContactStageAction} from '../store/actions' 

import '@styles/react/apps/app-kanban.scss'
// ** Kanban Component

const defaultValues = {
  taskTitle: ''
}

const KanbanBoards = props => {
  // ** Props
  const { board, index, toggleSidebar, labelColors, handleTaskSidebarToggle } = props
  // ** States
  const store = useSelector(state => state.leadContact.contactList) 
  // console.log(store)
  const [title, setTitle] = useState(board.title)
  const [showAddTask, setShowAddTask] = useState(null)
  const [boardDataHot, setBoardDataHot] = useState(store.data==null?[]:store.data.list.filter(data => data.stage === "hot"))
  const [boardDataWarm, setBoardDataWarm] = useState(store.data==null?[]:store.data.list.filter(data => data.stage === "warm"))
  const [boardDataCold, setBoardDataCold] = useState(store.data==null?[]:store.data.list.filter(data => data.stage === "cold"))
  const dispatch = useDispatch()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  useEffect(() => {
    setTitle(board.title)
  }, [board.title])

  const handleAddTaskReset = () => {
    reset()
    setShowAddTask(null)
  }

  const handleOpenAddTask = () => {
    reset()
    setShowAddTask(board.id)
  }

  const handleClearTasks = () => {
    // dispatch(clearTasks(board.id))
  }

  const handleDeleteBoard = () => {
    // dispatch(deleteBoard(board.id))
  }

  const handleAddTaskFormSubmit = data => {
    // handleAddTaskReset()
  }

  const renderAddTaskForm = () => {
    return board.id === showAddTask ? (
      <form onSubmit={handleSubmit(handleAddTaskFormSubmit)}>
        <div className='mb-1'>
          <Controller
            name='taskTitle'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                autoFocus
                rows='2'
                value={value}
                type='textarea'
                id='task-title'
                onChange={onChange}
                placeholder='Add Content'
                invalid={errors.taskTitle && true}
                aria-describedby='validation-add-task'
              />
            )}
          />
          {errors.taskTitle && (
            <FormText color='danger' id='validation-add-task'>
              Please enter a valid Task Title
            </FormText>
          )}
        </div>
        <div>
          <Button color='primary' size='sm' type='submit' className='me-75'>
            Add
          </Button>
          <Button outline size='sm' color='secondary' onClick={handleAddTaskReset}>
            Cancel
          </Button>
        </div>
      </form>
    ) : null
  }


  const MoveTaskToAnotherBoard = ev => {
    dispatch(
      updateContactStageAction({
        id: ev.item.dataset.taskId,
        stage: ev.item.dataset.boardId,
        newStage: ev.to.classList[1].replace('board-', '')
      })
    )
  }

  return (
    <Fragment key={index}>
      <Col xl='3' lg='3' sm='6'>
      <div className='board-wrapper h-100'>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center board-header'>
            <Input className='board-title border-0 bg-transparent input-lg task-field' value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <UncontrolledDropdown className='more-options-dropdown'>
            <DropdownToggle className='btn-icon' color='transparent' size='sm'>
              <MoreVertical size={20} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                href='/'
                onClick={e => {
                  e.preventDefault()
                  // handleClearTasks()
                }}
              >
                Clear Tasks
              </DropdownItem>
              <DropdownItem
                href='/'
                onClick={e => {
                  e.preventDefault()
                  // handleDeleteBoard()
                }}
              >
                Delete Board
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div className='h-100'>
          {
            board.title === "hot"? <ReactSortable
            list={boardDataHot}
            group='shared-group'
            multiDrag
            setList={setBoardDataHot}
            onAdd={MoveTaskToAnotherBoard}
            className={`tasks-wrapper board-${board.id} mt-1 h-100`}
          >
            {boardDataHot.map((task, index) => {
                return (
                  <KanbanContacts
                    task={task}
                    toggleSidebar={toggleSidebar}
                    index={index}
                    labelColors={labelColors}
                    key={`${task.stage}-${index}`}
                    handleTaskSidebarToggle={handleTaskSidebarToggle}
                  />
                )
            })}
          </ReactSortable>:''
          }
          {
            board.title === "warm"? <ReactSortable
            list={boardDataWarm}
            group='shared-group'
            setList={setBoardDataWarm}
            onAdd={MoveTaskToAnotherBoard}
            className={`tasks-wrapper board-${board.id} mt-1 h-100`}
          >
            {boardDataWarm.map((task, index) => {
                return (
                  <KanbanContacts
                    task={task}
                    toggleSidebar={toggleSidebar}
                    index={index}
                    labelColors={labelColors}
                    key={`${task.stage}-${index}`}
                    handleTaskSidebarToggle={handleTaskSidebarToggle}
                  />
                )
            })}
          </ReactSortable>:''
          }
          {
            board.title === "cold"? <ReactSortable
            list={boardDataCold}
            group='shared-group'
            setList={setBoardDataCold}
            onAdd={MoveTaskToAnotherBoard}
            className={`tasks-wrapper board-${board.id} mt-1 h-100`}
          >
            {boardDataCold.map((task, index) => {
                return (
                  <KanbanContacts
                    task={task}
                    toggleSidebar={toggleSidebar}
                    index={index}
                    labelColors={labelColors}
                    key={`${task.stage}-${index}`}
                    handleTaskSidebarToggle={handleTaskSidebarToggle}
                  />
                )
            })}
          </ReactSortable>:''
          }
          {showAddTask === null || (showAddTask !== null && showAddTask !== board.id) ? (
            <Button size='sm' color='flat-secondary' onClick={toggleSidebar}>
              <Plus size={14} className='me-25' />
              <span className='align-middle'>Add New Lead</span>
            </Button>
          ) : (
            renderAddTaskForm()
          )}
        </div>
      </div>
      </Col>
    </Fragment>
  )
}

export default KanbanBoards
