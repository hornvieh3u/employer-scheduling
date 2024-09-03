// ** React Imports
import { useParams } from 'react-router-dom'
// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Plus } from 'react-feather'
import Sidebar2 from '@components/sidebar'
// ** Reactstrap Imports

import {
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap'
import { useState } from 'react'
import NotesTable from '../notes/NotesTable'

const Sidebar = (props) => {
  const [open, setopen] = useState(false)
  // ** Props
  const [active, setactive] = useState('Expired')
  // ** Props
  const handleActiveItem = (value) => {
    if ((active === value)) {
      return true
    } else {
      return false
    }
  }
  const handlechange = (value) => {
    setactive(value)
  }
  const {
    sidebarOpen
  } = props
  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    ><div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <div className="form-group-compose text-center compose-btn">
              <Button
                color='primary'
                className="compose-email"
                block
                onClick={() => setopen(!open)}
              >View Notes</Button>
            </div>
            <PerfectScrollbar
              className="sidebar-menu-list"
              options={{ wheelPropagation: false }}
            >
              <ListGroup
                tag="div"
                className="list-group-messages"
              >
                <ListGroupItem
                  action
                  active={
                    handleActiveItem('Expired')
                  }
                  onClick={() => { handlechange('Expired') }}
                >
                  <span className="align-middle">Expired</span>
                  <Badge
                    className="float-end"
                    color="light-primary"
                    pill
                  >
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  action
                  active={handleActiveItem('In 30 Days')}
                  onClick={() => { handlechange('In 30 Days') }}

                >
                  <span className="align-middle">In 30 Days</span>
                  <Badge
                    className="float-end"
                    color="light-primary"
                    pill
                  >
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  action
                  active={handleActiveItem('In 60 Days')}
                  onClick={() => { handlechange('In 60 Days') }}

                >
                  <span className="align-middle">In 60 Days</span>
                  <Badge
                    className="float-end"
                    color="light-primary"
                    pill
                  >
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  action
                  active={handleActiveItem('In 90 Days')}
                  onClick={() => { handlechange('IN 90 Days') }}

                >
                  <span className="align-middle">In 90 Days</span>
                  <Badge
                    className="float-end"
                    color="light-primary"
                    pill
                  >
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  action
                  active={handleActiveItem('Frozen')}
                  onClick={() => { handlechange('Frozen') }}

                >
                  <span className="align-middle">Frozen</span>
                  <Badge
                    className="float-end"
                    color="light-primary"
                    pill
                  >
                    {0}
                  </Badge>
                </ListGroupItem>
              </ListGroup>
              <h6 className="section-label mt-3 mb-1 px-2">
                Status
              </h6>
              <ListGroup tag="div" className="list-group-labels">
                <ListGroupItem
                  active={handleActiveItem('personal')}
                  action
                  onClick={() => { handlechange('personal') }}

                >
                  <span className="bullet bullet-sm bullet-warning me-1"></span>
                  Waiting
                  <Badge
                    className="float-end"
                    color="light-primary"
                    pill
                  >
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('company')}
                  action
                  onClick={() => { handlechange('company') }}

                >
                  <span className="bullet bullet-sm bullet-primary me-1"></span>
                  Viewed
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('important')}
                  action
                  onClick={() => { handlechange('important') }}
                >
                  <span className="bullet bullet-sm bullet-success me-1"></span>
                  Completed
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('private')}
                  action
                  onClick={() => { handlechange('private') }}
                >
                  <span className="bullet bullet-sm bullet-danger me-1"></span>
                  Expired
                </ListGroupItem>
              </ListGroup>
              <div className="mt-3 px-2 d-flex justify-content-between">
                <h6 className="section-label mb-1">Folders</h6>
                <Plus
                  className="cursor-pointer"
                  size={14}
                />
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
      <Sidebar2
        size="lg"
        open={open}
        title="Expired Notes"
        width="700"
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={() => setopen(false)}
        onClosed={() => setopen(false)}
      >
        <NotesTable />
      </Sidebar2>
    </div>
  )
}

export default Sidebar
