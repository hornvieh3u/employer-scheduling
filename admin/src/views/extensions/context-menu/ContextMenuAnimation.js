// ** Third Party Components
import toast from 'react-hot-toast'
import { Menu, Item, useContextMenu, animation } from 'react-contexify'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap'

const ContextMenuAnimations = () => {
  const { show: showFade } = useContextMenu({
    id: 'fade'
  })
  const { show: showFlip } = useContextMenu({
    id: 'flip'
  })
  const { show: showSlide } = useContextMenu({
    id: 'pop'
  })

  const FadeMenu = () => {
    return (
      <Menu id='fade' animation={animation.fade}>
        <Item onClick={() => toast.success('Clicked Option 1')}>Option 1</Item>
        <Item onClick={() => toast.success('Clicked Option 2')}>Option 2</Item>
      </Menu>
    )
  }
  const FlipMenu = () => {
    return (
      <Menu id='flip' animation={animation.flip}>
        <Item onClick={() => toast.success('Clicked Option 1')}>Option 1</Item>
        <Item onClick={() => toast.success('Clicked Option 2')}>Option 2</Item>
      </Menu>
    )
  }
  const SlideMenu = () => {
    return (
      <Menu id='pop' animation={animation.slide}>
        <Item onClick={() => toast.success('Clicked Option 1')}>Option 1</Item>
        <Item onClick={() => toast.success('Clicked Option 2')}>Option 2</Item>
      </Menu>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Animations</CardTitle>
      </CardHeader>
      <CardBody>
        <div className='demo-inline-spacing'>
          <Button color='primary' onContextMenu={showFade} outline>
            Fade
          </Button>

          <Button color='primary' onContextMenu={showFlip} outline>
            Flip
          </Button>

          <Button color='primary' onContextMenu={showSlide} outline>
            Slide
          </Button>
        </div>
        <FadeMenu />
        <FlipMenu />
        <SlideMenu />
      </CardBody>
    </Card>
  )
}

export default ContextMenuAnimations
