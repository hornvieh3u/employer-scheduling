// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

const colourOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' }
]

const CreateMembership = ({ stepper, type }) => {
    // ** State
    const [picker, setPicker] = useState(new Date())

    return (
        <Fragment>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Row>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="nameMulti">
                            Membership Name
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            id="nameMulti"
                            placeholder="Membership Name"
                        />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="mtype">
                            Membership Type
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className="react-select"
                            classNamePrefix="select"
                            defaultValue={colourOptions[0]}
                            options={colourOptions}
                            isClearable={false}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="nameMulti">
                            Start Date
                        </Label>
                        <Flatpickr
                            className="form-control"
                            value={picker}
                            onChange={(date) => setPicker(date)}
                            id="default-picker"
                        />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="nameMulti">
                            Expiration Date
                        </Label>
                        <Flatpickr
                            className="form-control"
                            value={picker}
                            onChange={(date) => setPicker(date)}
                            id="default-picker"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="duration">
                            Duration
                        </Label>
                        <Input
                            type="number"
                            name="duration"
                            id="duration"
                            placeholder="Duration"
                        />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="folder">
                            Folder
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className="react-select"
                            classNamePrefix="select"
                            defaultValue={colourOptions[0]}
                            options={colourOptions}
                            isClearable={false}
                        />
                    </Col>
                </Row>

                <Col md="12" sm="12" className="mb-1">
                    <Label className="form-label" for="description">
                        Description
                    </Label>
                    <Input
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="Write a short description"
                    />
                </Col>
                <Row>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="image">
                            Image
                        </Label>
                        <Input type="file" id="image" name="fileInput" />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="folder">
                            Document Type
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className="react-select"
                            classNamePrefix="select"
                            defaultValue={colourOptions[0]}
                            options={colourOptions}
                            isClearable={false}
                        />
                    </Col>
                </Row>

                <div className="d-flex justify-content-between">
                    <Button
                        color="secondary"
                        className="btn-prev"
                        outline
                        disabled
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

export default CreateMembership
