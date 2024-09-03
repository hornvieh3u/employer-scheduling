// ** React Imports
import { Link, useParams } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Send, Edit2, Star, Info, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useState } from 'react'
import TicketInfo from './TicketInfo'

const Sidebar = props => {
  // ** Props
  const { store, sidebarOpen, toggleCompose, dispatch, getMails, resetSelectedMail, setSidebarOpen, resetSelectedTickets } = props

  // ** State Vars
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false)

  // ** Vars
  const params = useParams()

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = folder => {
    // dispatch(getMails({ ...store.params, folder }))
    // dispatch(resetSelectedMail())
    dispatch(resetSelectedTickets())
  }

  const handleLabel = label => {
    dispatch(getMails({ ...store.params, label }))
    dispatch(resetSelectedMail())
  }

  const handleCreateTicketClick = () => {
    setIsCreateTicketModalOpen(true)
    setSidebarOpen(false)
  }

  // ** Functions To Active List Item
  const handleActiveItem = value => {
    if ((params.status && params.status === value) || (params.label && params.label === value)) {
      return true
    } else {
      return false
    }
  }

  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    >
      <div className='sidebar'>
        <div className='sidebar-content email-app-sidebar'>
          <div className='email-app-menu'>
            <div className='form-group-compose text-center compose-btn'>
              <Button className='compose-email' color='primary' block onClick={handleCreateTicketClick}>
                Create a new ticket
              </Button>
            </div>
            <PerfectScrollbar className='sidebar-menu-list' options={{ wheelPropagation: false }}>
              <ListGroup tag='div' className='list-group-messages'>
                <ListGroupItem
                  tag={Link}
                  to='/apps/ticket/open'
                  onClick={() => handleFolder('inbox')}
                  action
                  active={!Object.keys(params).length || handleActiveItem('open')}
                >
                  <Mail size={18} className='me-75' />
                  <span className='align-middle'>Open</span>
                  {store.ticketsMeta?.open ? (
                    <Badge className='float-end' color='light-primary' pill>
                      {store.ticketsMeta?.open}
                    </Badge>
                  ) : null}
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to='/apps/ticket/pending'
                  onClick={() => handleFolder('sent')}
                  action
                  active={handleActiveItem('pending')}
                >
                  <Send size={18} className='me-75' />
                  <span className='align-middle'>Pending</span>
                  {store.ticketsMeta?.pending ? (
                    <Badge className='float-end' color='light-primary' pill>
                      {store.ticketsMeta?.pending}
                    </Badge>
                  ) : null}
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to='/apps/ticket/completed'
                  onClick={() => handleFolder('draft')}
                  action
                  active={handleActiveItem('completed')}
                >
                  <Edit2 size={18} className='me-75' />
                  <span className='align-middle'>Completed</span>
                  {store.ticketsMeta?.completed ? (
                    <Badge className='float-end' color='light-primary' pill>
                      {store.ticketsMeta?.completed}
                    </Badge>
                  ) : null}
                </ListGroupItem>
                {/* <ListGroupItem
                  tag={Link}
                  to='/apps/ticket/starred'
                  onClick={() => handleFolder('starred')}
                  action
                  active={handleActiveItem('starred')}
                >
                  <Star size={18} className='me-75' />
                  <span className='align-middle'>Starred</span>
                </ListGroupItem> */}
                <ListGroupItem
                  tag={Link}
                  to='/apps/ticket/spam'
                  onClick={() => handleFolder('spam')}
                  action
                  active={handleActiveItem('spam')}
                >
                  <Info size={18} className='me-75' />
                  <span className='align-middle'>Spam</span>
                  {store.ticketsMeta?.spam ? (
                    <Badge className='float-end' color='light-primary' pill>
                      {store.ticketsMeta?.spam}
                    </Badge>
                  ) : null}
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to='/apps/ticket/trash'
                  onClick={() => handleFolder('trash')}
                  action
                  active={handleActiveItem('trash')}
                >
                  <Trash size={18} className='me-75' />
                  <span className='align-middle'>Trash</span>
                </ListGroupItem>
              </ListGroup>
              <h6 className='section-label mt-3 mb-1 px-2'>Labels</h6>
              <ListGroup tag='div' className='list-group-labels'>
                <ListGroupItem
                  tag={Link}
                  // to='/apps/email/label/personal'
                  onClick={() => handleLabel('personal')}
                  active={handleActiveItem('personal')}
                  action
                >
                  <span className='bullet bullet-sm bullet-success me-1'></span>
                  Personal
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  // to='/apps/email/label/company'
                  onClick={() => handleLabel('company')}
                  active={handleActiveItem('company')}
                  action
                >
                  <span className='bullet bullet-sm bullet-primary me-1'></span>
                  Company
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  // to='/apps/email/label/important'
                  onClick={() => handleLabel('important')}
                  active={handleActiveItem('important')}
                  action
                >
                  <span className='bullet bullet-sm bullet-warning me-1'></span>
                  Important
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  // to='/apps/email/label/private'
                  onClick={() => handleLabel('private')}
                  active={handleActiveItem('private')}
                  action
                >
                  <span className='bullet bullet-sm bullet-danger me-1'></span>
                  Private
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
            <Modal
                    isOpen={isCreateTicketModalOpen}
                    toggle={() => setIsCreateTicketModalOpen(!isCreateTicketModalOpen)}
                    className="modal-dialog-centered"
                    size="lg"
                >
                    <ModalHeader toggle={() => setIsCreateTicketModalOpen(!isCreateTicketModalOpen)}>
                        Create A New Ticket
                    </ModalHeader>
                    <ModalBody>
                        <TicketInfo 
                          store={store}
                          dispatch={dispatch}
                          setIsCreateTicketModalOpen={setIsCreateTicketModalOpen}
                        />
                    </ModalBody>
                </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
