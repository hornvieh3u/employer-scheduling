// ** React Imports
import { Fragment, useState } from 'react'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

const DateTime = ({ stepper, type }) => {
    // ** State
    const [startPicker, setStartPicker] = useState(new Date())
    const [endPicker, setEndPicker] = useState(new Date())

    return (
        <Fragment>
            <div className="content-header">
                <h5 className="mb-0">Date & Time</h5>
                <small>When it's Happening.</small>
            </div>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Row>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="date-time-picker">
                            Start Date & Time
                        </Label>
                        <Flatpickr
                            value={startPicker}
                            data-enable-time
                            id="date-time-picker"
                            className="form-control"
                            onChange={(date) => setStartPicker(date)}
                        />
                    </Col>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="date-time-picker">
                            End Date & Time
                        </Label>
                        <Flatpickr
                            value={endPicker}
                            data-enable-time
                            id="date-time-picker"
                            className="form-control"
                            onChange={(date) => setEndPicker(date)}
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
                        onClick={() => stepper.next()}
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

export default DateTime
