// ** React Imports
import { Fragment, useState } from 'react'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

const Address = ({ stepper, type, payload, setPayload }) => {
    // ** State
    const [startPicker, setStartPicker] = useState(new Date())
    const [endPicker, setEndPicker] = useState(new Date())
    const [eventAddress, setEventLocation] = useState("")
    const [venueName, setVenueName] = useState("")

    const handleNext = () => {
        setPayload({
            ...payload,
            start: startPicker,
            end: endPicker,
        })
        stepper.next()
    }

    return (
        <Fragment>
            <div className="content-header">
                <h5 className="mb-0">Venue</h5>
                <small>Enter Event Address.</small>
            </div>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Row>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="startTimePicker">
                            Start Date & Time
                        </Label>
                        <Flatpickr
                            value={startPicker}
                            data-enable-time
                            id="startTimePicker"
                            className="form-control"
                            onChange={(date) => setStartPicker(date)}
                        />
                    </Col>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="endTimePicker">
                            End Date & Time
                        </Label>
                        <Flatpickr
                            value={endPicker}
                            data-enable-time
                            id="endTimePicker"
                            className="form-control"
                            onChange={(date) => setEndPicker(date)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="basicInput">
                            Venue Name
                        </Label>
                        <Input
                            type="location"
                            id="basicInput"
                            placeholder="House, Bar ..."
                            value={venueName}
                            onChange={(e) => setEventLocation(e.target.value)}
                        />
                    </Col>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="basicInput">
                            Address
                        </Label>
                        <Input
                            type="location"
                            id="basicInput"
                            placeholder="Enter Address"
                            value={eventAddress}
                            onChange={(e) => setEventAddress(e.target.value)}
                        />
                    </Col>
                </Row>


                <div className="d-flex justify-content-between">
                    <Button
                        color="primary"
                        className="btn-prev"
                        onClick={() => stepper.previous()}
                    >
                        <ArrowLeft
                            size={14}
                            className="align-middle me-sm-25 me-0"
                        ></ArrowLeft>
                        <span className="align-middle d-sm-inline-block d-none">
                            Previous
                        </span>
                    </Button>
                    <Button
                        color="primary"
                        className="btn-next"
                        onClick={() => handleNext()}
                    >
                        <span className="align-middle d-sm-inline-block d-none">
                            Next
                        </span>
                        <ArrowRight
                            size={14}
                            className="align-middle ms-sm-25 ms-0"
                        ></ArrowRight>
                    </Button>
                </div>
            </Form>
        </Fragment>
    )
}

export default Address
