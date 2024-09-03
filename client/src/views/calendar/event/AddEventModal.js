// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Label,
    Input
} from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

const AddEventModal = () => {
    // ** State
    const [modal, setModal] = useState(false)
    const [startPicker, setStartPicker] = useState(new Date())
    const [endPicker, setEndPicker] = useState(new Date())

    return (
        <Fragment>
            <div>
                <Button color="primary" onClick={() => setModal(!modal)}>
                    Add New Event
                </Button>
            </div>
            <Modal
                isOpen={modal}
                toggle={() => setModal(!modal)}
                className="modal-lg modal-dialog-centered"
            >
                <ModalHeader toggle={() => setModal(!modal)}>
                    Add New Event
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg="6" md="6" sm="12">
                            <div className="mb-1">
                                <Label className="form-label" for="basicInput">
                                    Event Title
                                </Label>
                                <Input
                                    type="title"
                                    id="basicInput"
                                    placeholder="Enter Event Title"
                                />
                            </div>
                            <div className="mb-1">
                                <Label className="form-label" for="inputFile">
                                    Upload A Banner
                                </Label>
                                <Input
                                    type="file"
                                    id="inputFile"
                                    name="fileInput"
                                />
                            </div>
                            <div className="mb-1">
                                <Label className="form-label" for="basicInput">
                                    Host Name
                                </Label>
                                <Input
                                    type="host"
                                    id="basicInput"
                                    placeholder="Enter Host Name"
                                />
                            </div>
                            <div className="mb-1">
                                <Label className="form-label" for="basicInput">
                                    Mobile Number
                                </Label>
                                <Input
                                    type="mobile"
                                    id="basicInput"
                                    placeholder="Enter Mobile Number"
                                />
                            </div>
                            <div className="mb-1">
                                <Label className="form-label" for="basicInput">
                                    Alternative Mobile
                                </Label>
                                <Input
                                    type="mobile"
                                    id="basicInput"
                                    placeholder="Enter Alternative Mobile"
                                />
                            </div>
                        </Col>
                        <Col lg="6" md="6" sm="12">
                            <div className="mb-1">
                                <Label
                                    className="form-label"
                                    for="date-time-picker"
                                >
                                    Start Date & Time
                                </Label>
                                <Flatpickr
                                    value={startPicker}
                                    data-enable-time
                                    id="date-time-picker"
                                    className="form-control"
                                    onChange={(date) => setStartPicker(date)}
                                />
                            </div>
                            <div className="mb-1">
                                <Label
                                    className="form-label"
                                    for="date-time-picker"
                                >
                                    End Date & Time
                                </Label>
                                <Flatpickr
                                    value={endPicker}
                                    data-enable-time
                                    id="date-time-picker"
                                    className="form-control"
                                    onChange={(date) => setEndPicker(date)}
                                />
                            </div>
                            <div className="mb-1">
                                <Label className="form-label" for="basicInput">
                                    Location
                                </Label>
                                <Input
                                    type="location"
                                    id="basicInput"
                                    placeholder="House, Bar ..."
                                />
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => setModal(!modal)}
                        outline
                    >
                        Create
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}
export default AddEventModal
