// ** React Imports
import { Fragment, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Input, Button, Label, NavLink } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Component Imports

// ** Icons Imports
import { AiOutlineClockCircle } from 'react-icons/ai'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useDispatch, useSelector } from 'react-redux'

// ** Events Actions Import
import { createBookingType, deleteBookingType, getBookingType, updateBookingType } from '../store'
import { Check, Copy, X } from 'react-feather'
import Sidebar from './Sidebar'





const BookingTypeManagement = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [selectType, setSelectType] = useState(null)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    // ** Store vars
    const dispatch = useDispatch()
    const store = useSelector((state) => {
        return state.book
    })

    useEffect(() => {
        dispatch(getBookingType())
    }, [])
    const MySwal = withReactContent(Swal)
    const handleDelete = (id) => {
        return MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger ms-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                dispatch(deleteBookingType(id))
            } else if (result.dismiss === MySwal.DismissReason.cancel) {
                MySwal.fire({
                    title: 'Cancelled',
                    text: 'Your event is safe :)',
                    icon: 'error',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                })
            }
        })
    }

    const copyToClipboard = (link) => {
      var textField = document.createElement('textarea')
      textField.innerText = window.location.host + link
      document.body.appendChild(textField)
      textField.select()
      document.execCommand('copy')
      textField.remove()
    }
    // ** Booking Type Card
    const BookingTypeCard = ({bookingType}) => {
        return (
            <Col md="4" sm="12">
                <Card>
                    <CardBody>
                        <div className='d-flex justify-content-between'>
                            <h4>{`${bookingType.title}`}</h4>
                        </div>
                        <div className='d-flex border-bottom pb-50 mb-1'>
                            <Link
                                to={`/book/add/${bookingType.link}`}
                                className='role-edit-modal'

                            >
                                <small className='fw-bolder'>View Booking page</small>
                            </Link>
                            <div className='flex-grow-1'></div>

                            <Link
                                to='/'
                                className='role-edit-modal'
                                onClick={e => {
                                    e.preventDefault()
                                    copyToClipboard(`/book/add/${bookingType.link}`)
                                }}
                            >
                                <small className='fw-bolder'>Copy link</small>
                            </Link>
                        </div>

                        <div className='d-flex align-items-center'>
                            <div className='form-switch'>
                                <Input type='switch'
                                       onChange={(e) => {
                                           let data = JSON.parse(JSON.stringify(bookingType))
                                           data.status = !data.status
                                           data._id = undefined
                                           dispatch(updateBookingType({
                                               id: bookingType._id,
                                               data: data
                                           }))
                                       }}
                                       defaultChecked={bookingType.status} id={`booking-switch-${bookingType._id}`} name='booking-switch' />
                                <Label className='form-check-label' htmlFor='billing-switch'>
                                    <span className='switch-icon-left'>

                                    </span>
                                </Label>
                            </div>
                            <Label className='form-check-label fw-bolder' for={`booking-switch-${bookingType._id}`}>
                                Booking is {bookingType.status?'ON':'OFF'}
                            </Label>
                        </div>
                        <div className='border-bottom pb-50 mb-1'>
                            <AiOutlineClockCircle className="font-medium-3 me-50" />
                            <span className="fw-bold">{bookingType.duration} minutes</span>
                        </div>
                        <div className='border-bottom pb-50 mb-1'>
                            <Input
                                className="mt-2"
                                type="textarea"
                                rows="4"
                                defaultValue={bookingType.description}
                                disabled
                            />
                        </div>
                        <div className='d-flex justify-content-between mt-1 pt-25'>
                            <Link
                                to='/'
                                className='role-edit-modal'
                                onClick={e => {
                                    e.preventDefault()
                                    handleDelete(bookingType._id)
                                }}
                            >
                                <small className='fw-bolder'>Delete</small>
                            </Link>

                            <Link
                                to='/'
                                className='role-edit-modal'
                                onClick={e => {
                                    e.preventDefault()
                                    const data = JSON.parse(JSON.stringify(bookingType))
                                    data._id = null
                                    dispatch(createBookingType(data))

                                }}
                            >
                                <small className='fw-bolder'>Clone</small>
                            </Link>

                            <Link
                                to='/'
                                className='role-edit-modal'
                                onClick={e => {
                                    e.preventDefault()
                                    setSelectType(bookingType)
                                    toggleSidebar()
                                }}
                            >
                                <small className='fw-bolder'>Edit</small>
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        )
    }



    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle="Booking Types"
                breadCrumbParent="Calendar"
                breadCrumbActive="All Booking Types"
            />
            <Row>
                <Col>
                    <Button
                        onClick={e => {
                            setSelectType(null)
                            toggleSidebar()
                        }}

                        color="primary"
                    >
                        Add Booking Type
                    </Button>
                </Col>
            </Row>
            <Row className='mt-2'>

                {
                    store.bookingTypes?
                    store.bookingTypes.map((bookingType) => {
                        return <BookingTypeCard bookingType={bookingType}/>
                    }):null
                }
            </Row>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} type={selectType}/>
        </Fragment>
    )
}
export default BookingTypeManagement