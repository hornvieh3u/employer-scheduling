// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'

// ** Icons Imports
import { ArrowLeft } from 'react-feather'

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
const PaymentInfo = ({ stepper, type }) => {
    return (
        <Fragment>
            <div className="content-header">
                <h5 className="mb-0">Create Membership</h5>
                <small className="text-muted">Enter Membership Details.</small>
            </div>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Row>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="pricing">
                            Pricing
                        </Label>
                        <Input
                            type="text"
                            name="pricing"
                            id="pricing"
                            placeholder="Pricing"
                        />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="regularPrice">
                            Regular Price
                        </Label>
                        <Input
                            type="number"
                            name="regularPrice"
                            id="regularPrice"
                            placeholder="Regular Price"
                        />
                    </Col>
                </Row>
                <Row>
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
                        <Label className="form-label" for="balance">
                            Balance
                        </Label>
                        <Input
                            type="number"
                            name="balance"
                            id="balance"
                            placeholder="Balance"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="downPayment">
                            Down Payment
                        </Label>
                        <Input
                            type="number"
                            name="downPayment"
                            id="downPayment"
                            placeholder="Down Payment"
                        />
                    </Col>

                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="paymentType">
                            Payment Type
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
                        <Label className="form-label" for="numberofPayments">
                            # of Payments
                        </Label>
                        <Input
                            type="number"
                            name="numberofPayments"
                            id="numberofPayments"
                            placeholder="# of Payments"
                        />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label" for="amount">
                            Amount
                        </Label>
                        <Input
                            type="number"
                            name="amount"
                            id="amount"
                            placeholder="Amount"
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
                        color="success"
                        className="btn-submit"
                        onClick={() => alert('submitted')}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </Fragment>
    )
}

export default PaymentInfo
