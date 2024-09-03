// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Check } from 'react-feather'
import { toast } from 'react-toastify'
import { Menu, Item, useContextMenu } from 'react-contexify'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap'

const ToastContent = ({ text }) => (
  <Fragment>
    <div className='toastify-header pb-0'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check />} />
        <h6 className='toast-title'>{`Clicked ${text}`}</h6>
      </div>
    </div>
  </Fragment>
)

const ContextMenuDoubleClick = () => {
  const { show } = useContextMenu({
    id: 'menu_double'
  })

  const handleClick = text => {
    toast.success(<ToastContent text={text} />, { icon: false, hideProgressBar: true, closeButton: false })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Double Click</CardTitle>
      </CardHeader>
      <CardBody>
        <Button color='primary' onDoubleClick={show} outline>
          Double Click On Me
        </Button>
        <Menu id='menu_double'>
          <Item onClick={() => handleClick('Option 1')}>Option 1</Item>
          <Item onClick={() => handleClick('Option 2')}>Option 2</Item>
        </Menu>
      </CardBody>
    </Card>
  )
}

export default ContextMenuDoubleClick
