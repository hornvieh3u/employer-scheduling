// ** Reactstrap Imports
import { Card, Row, Col, CardBody } from 'reactstrap'
import Avatar from '../../../../@core/components/avatar'

// ** Redux Imports
import { useDispatch } from 'react-redux'
import { handleSelectContact } from '../store/actions'
import '@styles/react/apps/app-kanban.scss'


const KanbanContacts = props => {
  // ** Props
  const { task, labelColors, toggleSidebar, handleTaskSidebarToggle } = props

  // ** Hooks
  const dispatch = useDispatch()

  const handleTaskClick = () => {
    dispatch(handleSelectContact(task))
    toggleSidebar()
  }
  const taskFooterClasses = () => {
    'justify-content-between'
  }

  return (
    <Card onClick={handleTaskClick} className='task' data-board-id={task.stage} data-task-id={task._id}>
      <CardBody data-task-id={task._id}>
      <div className="d-flex align-items-center">
            
            <div>
                <Row>
                  <Col xl='4'>
                    <Avatar color='light-success' content={task.fullName} size='lg' initials />
                  </Col>
                  <Col xl='8'>
                    <h5 className="mt-0">
                        {task.fullName}
                    </h5>
                    {task.status}
                  </Col>
                </Row>
                <div className="d-flex justify-content-between mt-1">
                    <div className="d-flex">
                        <div className="d-flex flex-column me-3">
                            <span className="fw-bold">
                                position: {task.position}
                            </span>
                            <span className="fw-bold">
                               company: {task.company}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

      </CardBody>
    </Card>
  )
}

export default KanbanContacts
