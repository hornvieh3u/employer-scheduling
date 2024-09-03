// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { Info } from 'react-feather'
import { toast } from 'react-toastify'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Button, Row, Col } from 'reactstrap'

const InfoToast = ({ title }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='info' icon={<Info size={12} />} />
        <h6 className='text-info ms-50 mb-0'>{title}</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span>I do not think that word means what you think it means.</span>
    </div>
  </Fragment>
)

const ToastPositions = () => {
  const notifyTopLeft = () => {
    return toast.info(<InfoToast title='Top Left!' />, {
      icon: false,
      hideProgressBar: true,
      position: toast.POSITION.TOP_LEFT
    })
  }
  const notifyTopCenter = () => {
    return toast.info(<InfoToast title='Top Center!' />, {
      icon: false,
      hideProgressBar: true,
      position: toast.POSITION.TOP_CENTER
    })
  }
  const notifyTopRight = () => {
    return toast.info(<InfoToast title='This Right!' />, {
      icon: false,
      hideProgressBar: true,
      position: toast.POSITION.TOP_RIGHT
    })
  }

  const notifyBottomLeft = () => {
    return toast.info(<InfoToast title='Bottom Left!' />, {
      icon: false,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT
    })
  }
  const notifyBottomCenter = () => {
    return toast.info(<InfoToast title='Bottom Center!' />, {
      icon: false,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_CENTER
    })
  }
  const notifyBottomRight = () => {
    return toast.info(<InfoToast title='This Right!' />, {
      icon: false,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Positions</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm='12'>
            <h5 className='mb-0'>Top Positions</h5>
            <div className='demo-inline-spacing'>
              <Button color='primary' outline onClick={notifyTopLeft}>
                Top Left
              </Button>
              <Button color='primary' outline onClick={notifyTopCenter}>
                Top Center
              </Button>
              <Button color='primary' outline onClick={notifyTopRight}>
                Top Right
              </Button>
            </div>
          </Col>
          <Col sm='12'>
            <h5 className='mt-2 mb-0'>Bottom Positions</h5>
            <div className='demo-inline-spacing'>
              <Button color='primary' outline onClick={notifyBottomLeft}>
                Bottom Left
              </Button>

              <Button color='primary' outline onClick={notifyBottomCenter}>
                Bottom Center
              </Button>

              <Button color='primary' outline onClick={notifyBottomRight}>
                Bottom Right
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default ToastPositions
