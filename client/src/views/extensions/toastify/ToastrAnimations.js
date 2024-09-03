// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Check, X, AlertTriangle, Info } from 'react-feather'
import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap'

const SuccessToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='text-success ms-50 mb-0'>Bounce!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span>I do not think that word means what you think it means.</span>
    </div>
  </Fragment>
)

const WarningToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='warning' icon={<AlertTriangle size={12} />} />
        <h6 className='text-warning ms-50 mb-0'>Flip!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span>I do not think that word means what you think it means.</span>
    </div>
  </Fragment>
)

const ErrorToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<X size={12} />} />
        <h6 className='text-danger ms-50 mb-0'>Zoom!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span>I do not think that word means what you think it means.</span>
    </div>
  </Fragment>
)

const InfoToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='info' icon={<Info size={12} />} />
        <h6 className='text-info ms-50 mb-0'>Slide!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span>I do not think that word means what you think it means.</span>
    </div>
  </Fragment>
)

const ToastAnimations = () => {
  const notifyBounce = () => toast.success(<SuccessToast />, { icon: false, transition: Bounce, hideProgressBar: true })
  const notifyFlip = () => toast.warning(<WarningToast />, { icon: false, transition: Flip, hideProgressBar: true })
  const notifyZoom = () => toast.error(<ErrorToast />, { icon: false, transition: Zoom, hideProgressBar: true })
  const notifySlide = () => toast.info(<InfoToast />, { icon: false, transition: Slide, hideProgressBar: true })

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Animations</CardTitle>
      </CardHeader>
      <CardBody>
        <div className='demo-inline-spacing'>
          <Button color='primary' outline onClick={notifyBounce}>
            Bounce
          </Button>

          <Button color='primary' outline onClick={notifyFlip}>
            Flip
          </Button>

          <Button color='primary' outline onClick={notifyZoom}>
            Zoom
          </Button>

          <Button color='primary' outline onClick={notifySlide}>
            Slide
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default ToastAnimations
