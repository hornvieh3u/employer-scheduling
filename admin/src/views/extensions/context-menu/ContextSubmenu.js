// ** Third Party Components
import toast from 'react-hot-toast'
import { Menu, Item, Submenu, useContextMenu } from 'react-contexify'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap'

const ContextSubMenu = () => {
  const { show } = useContextMenu({ id: 'submenu_id' })

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Sub Menu</CardTitle>
      </CardHeader>
      <CardBody>
        <Button color='primary' onContextMenu={show} outline>
          Submenu
        </Button>
        <Menu id='submenu_id'>
          <Item onClick={() => toast.success('Clicked Option 1')}>Option 1</Item>
          <Item onClick={() => toast.success('Clicked Option 2')}>Option 2</Item>
          <Item disabled>Option 3</Item>
          <Submenu label='Submenu'>
            <Item onClick={() => toast.success('Clicked Foo Bar')}>Foo Bar</Item>
            <Submenu label='Submenu'>
              <Item onClick={() => toast.success('Clicked Echo')}>Echo</Item>
              <Item onClick={() => toast.success('Clicked Foxtrot')}>Foxtrot</Item>
              <Item onClick={() => toast.success('Clicked Golf')}>Golf</Item>
            </Submenu>
          </Submenu>
        </Menu>
      </CardBody>
    </Card>
  )
}

export default ContextSubMenu
