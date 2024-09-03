// ** Third Party Components
import toast from 'react-hot-toast'
import { Menu, Item, useContextMenu } from 'react-contexify'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap'

const ContextMenuBasic = () => {
  const { show } = useContextMenu({ id: 'menu_id' })

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Basic Context Menu</CardTitle>
      </CardHeader>
      <CardBody>
        <Button color='primary' onContextMenu={show} outline>
          Right Click On Me
        </Button>
        <Menu id='menu_id'>
          <Item onClick={() => toast.success('Clicked Option 1')}>Item 1</Item>
          <Item onClick={() => toast.success('Clicked Option 2')}>Item 2</Item>
        </Menu>
      </CardBody>
    </Card>
  )
}

export default ContextMenuBasic
