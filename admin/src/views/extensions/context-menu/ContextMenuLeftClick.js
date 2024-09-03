// ** Third Party Components
import toast from 'react-hot-toast'
import { Menu, Item, useContextMenu } from 'react-contexify'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap'

const ContextMenuLeftClick = () => {
  const { show } = useContextMenu({ id: 'menu_left' })

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Left Click</CardTitle>
      </CardHeader>
      <CardBody>
        <Button color='primary' onClick={show} outline>
          Left Click On Me
        </Button>
        <Menu id='menu_left'>
          <Item onClick={() => toast.success('Clicked Option 1')}>Option 1</Item>
          <Item onClick={() => toast.success('Clicked Option 2')}>Option 2</Item>
        </Menu>
      </CardBody>
    </Card>
  )
}

export default ContextMenuLeftClick
