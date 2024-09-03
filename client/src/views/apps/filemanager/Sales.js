// ** Third Party Components
import { MoreVertical, RefreshCw, Settings, Trash } from 'react-feather'
import { Progress } from 'reactstrap'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

const Sales = (props) => {
  return (
    <Card className='shadow-none border cursor-pointer'>
      <CardHeader className='d-flex justify-content-between align-items-start pt-1 pb-0 pe-0'>
        <div>
          <img src={props.item.img} height={30}></img>
        </div>

        <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-40'>
            <MoreVertical size={15} className='cursor-pointer pe-0' />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>
              <RefreshCw size={15} className='me-1'/>
              Refresh
            </DropdownItem>
            <DropdownItem>
              <Settings size={15} className='me-1'/>
              Manage
            </DropdownItem>
            <DropdownItem>
              <Trash size={15} className='me-1'/>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <div className='my-1'>
          <h6>{props.item.driverName}</h6>
        </div>
        <div className='d-flex justify-content-between mb-50'>
          <span className='text-truncate'>
            {props.item.usedStore}GB Used
          </span>
          <small className='text-muted'>
            {props.item.totalStore}GB
          </small>
        </div>
        {props.item.id==1 && <Progress className='progress-bar-danger' value={props.item.usedStore/props.item.totalStore*100} />}
        {props.item.id==2 && <Progress className='progress-bar-success' value={props.item.usedStore/props.item.totalStore*100} />}
        {props.item.id==3 && <Progress className='progress-bar-primary' value={props.item.usedStore/props.item.totalStore*100} />}
        {props.item.id==4 && <Progress className='progress-bar-info' value={props.item.usedStore/props.item.totalStore*100} />}
      </CardBody>
    </Card>
  )
}
export default Sales
