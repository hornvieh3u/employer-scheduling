// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { toast } from 'react-toastify'
import { Bell, Check, X, AlertTriangle, Info } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap'

const PrimaryToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='primary' icon={<Bell size={12} />} />
        <h6 className='toast-title'>Default!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.
      </span>
    </div>
  </Fragment>
)

const SuccessToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title'>Success!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.
      </span>
    </div>
  </Fragment>
)

const ErrorToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<X size={12} />} />
        <h6 className='toast-title'>Error!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.
      </span>
    </div>
  </Fragment>
)

const WarningToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='warning' icon={<AlertTriangle size={12} />} />
        <h6 className='toast-title'>Warning!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.
      </span>
    </div>
  </Fragment>
)

const InfoToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='info' icon={<Info size={12} />} />
        <h6 className='toast-title'>Info!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.
      </span>
    </div>
  </Fragment>
)

const SuccessProgressToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title'>Progress Bar!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.
      </span>
    </div>
  </Fragment>
)

const ToastTypes = () => {
  const notifyDefault = () => toast(<PrimaryToast />, { icon: false, hideProgressBar: true })
  const notifySuccess = () => toast.success(<SuccessToast />, { icon: false, hideProgressBar: true })
  const notifyError = () => toast.error(<ErrorToast />, { icon: false, hideProgressBar: true })
  const notifyWarning = () => toast.warning(<WarningToast />, { icon: false, hideProgressBar: true })
  const notifyInfo = () => toast.info(<InfoToast />, { icon: false, hideProgressBar: true })
  const notifySuccessProgress = () => toast.success(<SuccessProgressToast />, { icon: false })

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Types</CardTitle>
      </CardHeader>
      <CardBody>
        <div className='demo-inline-spacing'>
          <Button color='primary' onClick={notifyDefault} outline>
            Default
          </Button>
          <Button color='success' onClick={notifySuccess} outline>
            Success
          </Button>
          <Button color='danger' onClick={notifyError} outline>
            Error
          </Button>
          <Button color='warning' onClick={notifyWarning} outline>
            Warning
          </Button>
          <Button color='info' onClick={notifyInfo} outline>
            Info
          </Button>
          <Button color='success' onClick={notifySuccessProgress} outline>
            Success Progress Bar
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default ToastTypes
