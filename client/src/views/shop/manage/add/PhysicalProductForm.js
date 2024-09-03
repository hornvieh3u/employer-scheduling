import React from 'react'
import { Button, Col, Form, Input, Label, Row } from 'reactstrap'

// ** Third Party Components
import Select from 'react-select'

// ** Utils
import { selectThemeColors } from '@utils'

const colourOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' }
]

const PhysicalProductForm = () => {
    return (
        <>
            <Form>
                <Row>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="nameMulti">
                            Product Name
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            id="nameMulti"
                            placeholder="Product Name"
                        />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="mtype">
                            Product Type
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
                    <Col md="12" sm="12" className="mb-1">
                        <Label className="form-label" for="description">
                            Product Description
                        </Label>
                        <Input
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder="Write a short description"
                        />
                    </Col>

                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="totalPrice">
                            Total Price
                        </Label>
                        <Input
                            type="number"
                            name="totalPrice"
                            id="totalPrice"
                            placeholder="Total Price"
                        />
                    </Col>

                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="paynow">
                            Pay Now
                        </Label>
                        <Input
                            type="number"
                            name="paynow"
                            id="paynow"
                            placeholder="Write an amount to pay"
                        />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="payLater">
                            Pay Later
                        </Label>
                        <Input
                            type="number"
                            name="payLater"
                            id="payLater"
                            placeholder="Pay Later"
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
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="image">
                            Product Image
                        </Label>
                        <Input type="file" id="image" name="fileInput" />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="attachDoc">
                            Attach Document
                        </Label>
                        <Input type="file" id="attachDoc" name="fileInput" />
                    </Col>

                    <Col sm="12">
                        <div className="d-flex">
                            <Button
                                className="me-1"
                                color="primary"
                                type="submit"
                                onClick={(e) => e.preventDefault()}
                            >
                                Create
                            </Button>
                            <Button outline color="secondary" type="reset">
                                Reset
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default PhysicalProductForm
