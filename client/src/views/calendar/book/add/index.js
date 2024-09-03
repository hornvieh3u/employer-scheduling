// ** React Imports
import { Fragment, useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

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
import { getBookingType, getBookingTypeDetail } from '../store'
import { Check, Copy, X } from 'react-feather'
import { getEventInfo } from '../../event/store'
import Flatpickr from 'react-flatpickr'
import Sidebar from './Sidebar'

const MySwal = withReactContent(Swal)


const BookingTypeManagement = () => {
    const  { typeLink } = useParams()
    const { colors } = useContext(ThemeColors)
    const [picker, setPicker] = useState(null)
    const [showTime, setShowTime] = useState(false)
    const [selectTime, setSelectTime] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    // ** Store vars
    const dispatch = useDispatch()
    const store = useSelector((state) => {

        return state.book
    })
    let timeList = []
    for(var i = 60 * 12; i <= 60 * 22 + 30; i += 30) {
        timeList.push(i)
    }
    const formatTime = (time) => {
        let hour = parseInt(time / 60)
        let minutes = time % 60
        if(minutes < 10) minutes = "0" + minutes
        let prefix = 'am'
        if(hour >= 12) {
            prefix = 'pm'
        }
        if(hour > 12) hour = hour - 12
        return hour + ":" + minutes + " " + prefix
    }
    const { userData } = useSelector((state) => state.auth)
    // useEffect(() => {
    //     (async () => {
    //         const response = await getBookingTypeDetail(typeLink)
    //         setBookingTypeInfo(response)
    //     })()
    // }, [])

    useEffect(() => {
        dispatch(getBookingTypeDetail(typeLink))
    }, [])


    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle="Booking Types"
                breadCrumbParent="Calendar"
                breadCrumbActive="Create Booking"
            />
            <Row>
                <Col md="4" sm="12" className='p-2'>
                    <div className=''>

                        <small>{userData && userData?.fullName}</small>
                    </div>
                    <div className=''>

                        <h4 className='form-check-label fw-bolder'>
                            {store.detailBookingType && store.detailBookingType.title}
                        </h4>
                    </div>
                    <div className=''>
                        <AiOutlineClockCircle className="font-medium-3 me-50" />
                        <span className="fw-bold">{store.detailBookingType && store.detailBookingType.duration} minutes</span>
                    </div>
                </Col>
                <Col md="4" sm="12" className='p-2'>
                    <div className=''>

                        <h6 className='form-check-label fw-bolder'>
                            Select Date & Time
                        </h6>
                    </div>
                    <Flatpickr
                        options={{
                            inline: true,
                            minDate: 'today',

                        }}
                        value={picker}
                        className="form-control invoice-edit-input due-date-picker"
                        onChange={(date) => {

                            setPicker(date)
                            setShowTime(true)
                        }}
                    />
                </Col>
                {showTime? (<Col md="2" sm="12" style={{maxHeight: '500px', overflow: 'auto'}}>
                    {
                        timeList.map((time) => {
                            let color = 'secondary'
                            if(selectTime == time) {
                                color = 'primary'
                            }
                            return <Button
                                onClick={(e) => {
                                    toggleSidebar()
                                    setStartDate(new Date(new Date(picker[0]).getTime() + time*60000))
                                    setSelectTime(time)
                                }}
                                className='w-100 mt-1'
                                color={color}
                            >
                                {formatTime(time)}
                            </Button>
                        })
                    }
                </Col>): null}

            </Row>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} duration={store.detailBookingType && store.detailBookingType.duration} startDate={startDate}/>
        </Fragment>
    )
}
export default BookingTypeManagement
