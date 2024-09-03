// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { CheckCircle, X } from 'react-feather'
import Select, { components } from 'react-select'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Reactstrap Imports
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    Form,
    Row,
    Col
} from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import moment from 'moment'

const AddAppointment = (props) => {
    // ** Props
    const { addAppointmentSidebarOpen, setAddAppointmentSidebarOpen } = props

    // ** States
    const [allDay, setAllDay] = useState(false)
    const [startPicker, setStartPicker] = useState(new Date())
    const [endPicker, setEndPicker] = useState(new Date())
    const [selectedType, setSelectedType] = useState([{ value: 'Do not Repeat', label: 'Do not Repeat' },])
    const [selectedColor, setSelectedColor] = useState("#8aff43")
    const [daysSelected, setDaysSelected] = useState([])
    const [calendarLabel, setCalendarLabel] = useState([
        { value: 'Business', label: 'Business', color: 'primary' }
    ])
    const [invitedList, setInvitedList] = useState([
        { value: 'Monu', label: 'Monu' },
    ])

    // ** Select Options
    const options = [
        { value: 'Business', label: 'Business', color: 'primary' },
        { value: 'Personal', label: 'Personal', color: 'danger' },
        { value: 'Family', label: 'Family', color: 'warning' },
        { value: 'Holiday', label: 'Holiday', color: 'success' },
        { value: 'ETC', label: 'ETC', color: 'info' }
    ]
    const inviteOptions = [
        { value: 'Monu', label: 'Monu' },
        { value: 'Ajay', label: 'Ajay' },
        { value: 'Clinton Oh', label: 'Clinton Oh' },
        { value: 'Diwakar', label: 'Diwakar' },
        { value: 'Akshit', label: 'Akshit' }
    ]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const repeatOn = [
        { value: 'Do not Repeat', label: 'Do not Repeat' },
        { value: 'Day', label: 'Day' },
        { value: 'Week', label: 'Week' },
        { value: 'Month', label: 'Month' },
        { value: 'Year', label: 'Year' }
    ]
    // ** Custom select components
    const OptionComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                <span
                    className={`bullet bullet-${data.color} bullet-sm me-50`}
                ></span>
                {data.label}
            </components.Option>
        )
    }
    const handleColorChange = (e) => {
        setSelectedColor(e.target.value)
    }
    const handleSelectedDays = async (item) => {
        let index = daysSelected.indexOf(item)
        if (index > -1) {
            daysSelected.splice(index, 1)
            setDaysSelected([...daysSelected])
        } else {
            setDaysSelected([...daysSelected, item])
        }
    }

    // ** Close BTN
    const CloseBtn = (
        <X className="cursor-pointer" size={15} onClick={() => setAddAppointmentSidebarOpen(false)} />
    )

    return (
        <Modal
            isOpen={addAppointmentSidebarOpen}
            style={{ width: "500px" }}
            toggle={() => setAddAppointmentSidebarOpen(false)}
            contentClassName="p-0 overflow-hidden"
            modalClassName="modal-slide-in event-sidebar"
        >
            <ModalHeader
                className="mb-1"
                toggle={() => setAddAppointmentSidebarOpen(false)}
                close={CloseBtn}
                tag="div"
            >
                <h5 className="modal-title">Add Appointment</h5>
            </ModalHeader>
            <PerfectScrollbar options={{ wheelPropagation: false }}>
                <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
                    <Form>
                        <Row>
                            <Col sm={9} md={9} lg={9}>
                                <div className="mb-1">
                                    <Label className="form-label" for="title">
                                        Event Title <span className="text-danger">*</span>
                                    </Label>
                                    <Input id="title" placeholder="Event Title" />
                                </div>
                            </Col>
                            <Col sm={3} md={3} lg={3}>
                                <div className="mb-1">
                                    <Label className="form-label" for="color">
                                        color <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                        type='color'
                                        name='color'
                                        id='color'
                                        style={{ height: 40 }}
                                        value={selectedColor}
                                        onChange={handleColorChange}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <div className="mb-1">
                                    <Label className="form-label" for="invite">
                                        Invite
                                    </Label>
                                    <Select
                                        id="invite"
                                        value={invitedList}
                                        options={inviteOptions}
                                        theme={selectThemeColors}
                                        // className="react-select"
                                        classNamePrefix="select"
                                        isClearable={false}
                                        onChange={(data) => setInvitedList([data])}
                                    // components={{
                                    //     Option: OptionInviteComponent
                                    // }}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <div className="mb-1">
                                    <Label className="form-label" for="label">
                                        Type
                                    </Label>
                                    <Select
                                        id="label"
                                        value={calendarLabel}
                                        options={options}
                                        theme={selectThemeColors}
                                        // className="react-select"
                                        classNamePrefix="select"
                                        isClearable={false}
                                        onChange={(data) => setCalendarLabel([data])}
                                        components={{
                                            Option: OptionComponent
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <div className="mb-2">
                                    <Label className="form-label" for="startDate">
                                        Start Date & Time
                                    </Label>
                                    <Flatpickr
                                        required
                                        id="startDate"
                                        name="startDate"
                                        className="form-control"
                                        onChange={(date) => setStartPicker(date[0])}
                                        value={startPicker}
                                        options={{
                                            enableTime: allDay === false,
                                            dateFormat: 'm-d-Y h:i K',
                                            time_24hr: false
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <div className="mb-2">
                                    <Label className="form-label" for="startDate">
                                        End Date & Time
                                    </Label>
                                    <Flatpickr
                                        required
                                        id="startDate"
                                        name="startDate"
                                        className="form-control"
                                        onChange={(date) => setEndPicker(date[0])}
                                        value={endPicker}
                                        options={{
                                            enableTime: allDay === false,
                                            dateFormat: 'm-d-Y h:i K',
                                            time_24hr: false
                                        }}
                                    />
                                </div>
                            </Col>
                            <h5 className='my-1'>Repeat</h5>
                            <Col sm={4} md={4} lg={4} className="px-3">
                                <div className="mb-1">
                                    <Label className="form-label" for="number">
                                        Repeat
                                    </Label>
                                    <Input
                                        id="number"
                                        type='number'
                                        placeholder={0}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <div className="mb-1">
                                    <Label className="form-label" for="description">
                                        Every
                                    </Label>
                                    <Select
                                        id="invite"
                                        value={selectedType}
                                        options={repeatOn}
                                        theme={selectThemeColors}
                                        // className="react-select"
                                        classNamePrefix="select"
                                        isClearable={false}
                                        onChange={(data) => setSelectedType([data])}
                                    // components={{
                                    //     Option: OptionInviteComponent
                                    // }}
                                    />
                                </div>
                            </Col>
                            <Col sm={12} md={12} lg={12}>
                                <div style={{ border: "1px solid #82868b", borderRadius: "8px" }} className="mb-1 p-1">
                                    <Label>
                                        {selectedType[0].value === "Do not Repeat" ? "Never Repeat This Event."
                                            : selectedType[0].value === "Day" ? `Repeats every Day from ${moment(startPicker).format(
                                                "DD MMM YYYY"
                                            )} ending on ${moment(endPicker).format("DD MMM YYYY")}`
                                                : selectedType[0].value === "Week" ? (
                                                    <>
                                                        {days.map((item, i) => {
                                                            return (
                                                                <Button
                                                                    key={i}
                                                                    outline={daysSelected.includes(item) ? false : true}
                                                                    size="sm"
                                                                    color={daysSelected.includes(item) ? "primary" : "secondary"}
                                                                    style={{ borderRadius: "40px", marginLeft: "10px", marginBottom: "5px", padding: "5px" }}
                                                                    onClick={() => handleSelectedDays(item, i)}
                                                                >
                                                                    <CheckCircle /> {item}
                                                                </Button>
                                                            )
                                                        })}
                                                    </>

                                                )
                                                    : selectedType[0].value === "Month" ? `Repeats every Month on the ${moment(startPicker).format(
                                                        "DD MMM YYYY"
                                                    )} ending on ${moment(endPicker).format("DD MMM YYYY")}`
                                                        : `Repeats every Year on the ${moment(startPicker).format(
                                                            "DD MMM YYYY"
                                                        )} ending on ${moment(endPicker).format("DD MMM YYYY")}`

                                        }
                                    </Label>
                                </div>
                            </Col>
                            <div className="d-flex mb-1">
                                <Button
                                    className="me-1"
                                    type="submit"
                                    color="primary"
                                >
                                    Add
                                </Button>
                                <Button
                                    color="secondary"
                                    type="reset"
                                    onClick={() => setAddAppointmentSidebarOpen(false)}
                                    outline
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Row>
                    </Form>
                </ModalBody>
            </PerfectScrollbar>
        </Modal >
    )
}

export default AddAppointment
