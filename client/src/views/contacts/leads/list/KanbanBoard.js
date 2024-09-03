// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Imports
import { Plus } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Input, Row, Col, FormText } from 'reactstrap'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

import KanbanBoards from './KanbanBoards'

// ** Styles
import '@styles/react/apps/app-kanban.scss'

const defaultValues = {
  boardTitle: ''
}

const labelColors = {
  App: 'info',
  UX: 'success',
  Images: 'warning',
  Forms: 'success',
  'Code Review': 'danger',
  'Charts & Maps': 'primary'
}

const KanbanBoard = (props) => {
  // ** States
  const toggleSidebar = props.toggleSidebar
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAddBoard, setShowAddBoard] = useState(false)
  const [stages, setStages] = useState([
    {id: "cold", title: "cold"},
    {id: "warm", title: "warm"},
    {id: "hot", title: "hot"}
  ])
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.leadContact.contactList)
  
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
 
  const handleAddBoardReset = () => {
    reset()
    setShowAddBoard(false)
  }

  const handleOpenAddBoard = () => {
    reset()
    setShowAddBoard(true)
  }

  const handleAddBoardFormSubmit = data => {
    setStages(stages.concat({id: data.boardTitle, title: data.boardTitle}))
    handleAddBoardReset()
  }

  const handleTaskSidebarToggle = () => setSidebarOpen(!sidebarOpen)

  const renderBoards = () => {
    return stages.map((stage, index) => {
      const isLastBoard = stages[stages.length - 1].id === stage.id

      return (
        <KanbanBoards
          toggleSidebar={toggleSidebar}
          store={store.data.list}
          board={stage}
          labelColors={labelColors}
          isLastBoard={isLastBoard}
          key={`${stage.id}-${index}`}
          index={`${stage.id}-${index}`}
          handleTaskSidebarToggle={handleTaskSidebarToggle}
        />
      )
    })
  }

  const renderAddBoardForm = () => {
    return showAddBoard ? (
      <form onSubmit={handleSubmit(handleAddBoardFormSubmit)}>
        <div className='mb-50'>
          <Controller
            name='boardTitle'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                autoFocus
                value={value}
                id='board-title'
                onChange={onChange}
                placeholder='Board Title'
                invalid={Boolean(errors.boardTitle)}
                aria-describedby='validation-add-board'
              />
            )}
          />
          {errors.boardTitle && (
            <FormText color='danger' id='validation-add-board'>
              Please enter a valid Board Title
            </FormText>
          )}
        </div>
        <div>
          <Button color='primary' size='sm' type='submit' className='me-75'>
            Add
          </Button>
          <Button outline size='sm' color='secondary' onClick={handleAddBoardReset}>
            Cancel
          </Button>
        </div>
      </form>
    ) : null
  }

  return stages.length ? (
    <div className='app-kanban-wrapper overflow-x-scroll'>
      <Row className='flex-nowrap'>
       {renderBoards()}
      <Col xl='2'>
        <div className='ms-1' style={{ minWidth: 150 }}>
          {!showAddBoard ? (
            <Button size='sm' color='light-secondary' onClick={handleOpenAddBoard}>
              <Plus size={14} className='me-25' />
              <span className='align-middle'> Add Stage</span>
            </Button>
          ) : (
            renderAddBoardForm()
          )}
        </div>
      </Col>
      </Row>
    </div>
  ) : null
}

export default KanbanBoard
