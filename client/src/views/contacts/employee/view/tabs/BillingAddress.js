// ** React Imports
import { Fragment, useEffect, useMemo, useState, memo } from 'react'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Label,
    Input,
    Modal,
    Button,
    CardBody,
    CardTitle,
    ModalBody,
    CardHeader,
    ModalHeader,
    FormFeedback
} from 'reactstrap'

// Import actions and Reset reducer
import { billingAddressUpdateAction } from '../../store/actions'
import { billingAddressUpdateReset } from '../../store/reducer'

// ** Third Party Components
import Select from 'react-select'
import { Home, Check, X, Briefcase } from 'react-feather'
import useMessage from '../../../../../lib/useMessage'
// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useDispatch, useSelector } from 'react-redux'

const countryOptions = [
    { value: 'uk', label: 'UK' },
    { value: 'usa', label: 'USA' },
    { value: 'france', label: 'France' },
    { value: 'russia', label: 'Russia' },
    { value: 'canada', label: 'Canada' }
]

const defaultValues = {
    lastName: '',
    firstName: ''
}

const BillingAddress = () => {
    // ** States
    const [show, setShow] = useState(false)
    const [employeeId, setEmployeeId] = useState(null)

    const [state, setState] = useState({
        zipCode: '',
        state: '',
        street: '',
        city: '',
        country: '',
        email: '',
        phone: '',
        taxId: '',
        vatNo: '',
        addressLineOne: '',
        addressLineTwo: ''
    })

    const { success } = useMessage()
    const dispatch = useDispatch()
    const { contact } = useSelector((state) => state.employeeContact)
    const { billingAddressUpdate } = useSelector(
        (state) => state.employeeContact
    )
    const { loading, success: updateSuccess } = billingAddressUpdate

    // already Reseted handler

    useEffect(() => {
        if (updateSuccess) {
            // hide modal
            setShow(!show)
            // message
            success('Billing information updated successfully')

            dispatch(billingAddressUpdateReset())
        }
        setShow(false)
    }, [updateSuccess])

    useMemo(() => {
        if (contact) {
            if (contact.data) {
                setEmployeeId(contact?.data?._id)
                if (contact?.data?.billingAddress) {
                    setState(contact?.data?.billingAddress)
                }
            }
        }
    }, [contact])

    function updateSubmitHandler() {
        dispatch(
            billingAddressUpdateAction(
                {
                    ...state,
                    employeeId: employeeId
                },
                employeeId
            )
        )
    }

    const onDiscard = () => {
        // clearErrors()
        setShow(false)
        // reset()
    }

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">Billing Address</CardTitle>
                    <Button
                        color="primary"
                        size="sm"
                        onClick={() => setShow(true)}
                    >
                        Edit Address
                    </Button>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xl="7" xs="12">
                            <Row tag="dl" className="mb-0">
                                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                                    Full Name:
                                </Col>
                                <Col tag="dd" sm="8" className="mb-1">
                                    {contact?.data?.fullName}
                                </Col>

                                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                                    Billing Email:
                                </Col>
                                <Col tag="dd" sm="8" className="mb-1">
                                    {contact?.data?.email}
                                </Col>

                                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                                    Tax ID:
                                </Col>
                                <Col tag="dd" sm="8" className="mb-1">
                                    {contact?.data?.billingAddress?.taxId}
                                </Col>

                                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                                    VAT Number:
                                </Col>
                                <Col tag="dd" sm="8" className="mb-1">
                                    {contact?.data?.billingAddress?.vatNo}
                                </Col>

                                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                                    Billing Address:
                                </Col>
                                <Col tag="dd" sm="8" className="mb-1">
                                    {
                                        contact?.data?.billingAddress
                                            ?.addressLineOne
                                    }
                                    {
                                        contact?.data?.billingAddress
                                            ?.addressLineTwo
                                    }{' '}
                                    {contact?.data?.billingAddress?.street}{' '}
                                    {contact?.data?.billingAddress?.city}{' '}
                                    {contact?.data?.billingAddress?.state}{' '}
                                    {contact?.data?.billingAddress?.country}
                                </Col>
                            </Row>
                        </Col>
                        <Col xl="5" xs="12">
                            <Row tag="dl" className="mb-0">
                                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                                    Contact:
                                </Col>
                                <Col tag="dd" sm="8" className="mb-1">
                                    {contact?.data?.phone}
                                </Col>

                                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                                    Country:
                                </Col>
                                <Col tag="dd" sm="8" className="mb-1">
                                    {contact?.data?.billingAddress?.country}
                                </Col>

                                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                                    State:
                                </Col>
                                <Col tag="dd" sm="8" className="mb-1">
                                    {contact?.data?.billingAddress?.state}
                                </Col>

                                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                                    Zipcode:
                                </Col>
                                <Col tag="dd" sm="8" className="mb-1">
                                    {contact?.data?.billingAddress?.zipCode}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Modal
                isOpen={show}
                onClosed={onDiscard}
                toggle={() => setShow(!show)}
                className="modal-dialog-centered modal-lg"
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setShow(!show)}
                ></ModalHeader>
                <ModalBody className="pb-5 px-sm-4 mx-50">
                    <h1 className="address-title text-center mb-1">
                        Update Billing Address
                    </h1>
                    {/* <p className='address-subtitle text-center mb-2 pb-75'>Add address for billing address</p> */}
                    <Row tag="form" className="gy-1 gx-2">
                        <Col xs={12} md={6}>
                            <Label className="form-label" for="state-province">
                                Tax ID
                            </Label>
                            <Input
                                value={state.taxId}
                                onChange={(e) =>
                                    setState((p) => ({
                                        ...p,
                                        taxId: e?.target?.value
                                    }))
                                }
                                id="state-province"
                                placeholder="TAX ID"
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <Label className="form-label" for="zip-code">
                                VAT No
                            </Label>
                            <Input
                                value={state.vatNo}
                                onChange={(e) =>
                                    setState((p) => ({
                                        ...p,
                                        vatNo: e?.target?.value
                                    }))
                                }
                                id="zip-code"
                                placeholder="VAT NO"
                            />
                        </Col>

                        <Col xs={12}>
                            <Label className="form-label" for="addressLine1">
                                Address Line 1
                            </Label>
                            <Input
                                value={state.addressLineOne}
                                onChange={(e) =>
                                    setState((p) => ({
                                        ...p,
                                        addressLineOne: e?.target?.value
                                    }))
                                }
                                id="addressLine1"
                                placeholder="12, Business Park"
                            />
                        </Col>
                        <Col xs={12}>
                            <Label className="form-label" for="addressLine2">
                                Address Line 2
                            </Label>
                            <Input
                                value={state.addressLineTwo}
                                onChange={(e) =>
                                    setState((p) => ({
                                        ...p,
                                        addressLineTwo: e?.target?.value
                                    }))
                                }
                                id="addressLine2"
                                placeholder="Mall Road"
                            />
                        </Col>
                        <Col xs={12}>
                            <Label className="form-label" for="city">
                                City
                            </Label>
                            <Input
                                value={state.city}
                                onChange={(e) =>
                                    setState((p) => ({
                                        ...p,
                                        city: e?.target?.value
                                    }))
                                }
                                id="city"
                                placeholder="Los Angeles"
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <Label className="form-label" for="state-province">
                                State / Province
                            </Label>
                            <Input
                                value={state.state}
                                onChange={(e) =>
                                    setState((p) => ({
                                        ...p,
                                        state: e?.target?.value
                                    }))
                                }
                                id="state-province"
                                placeholder="California"
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <Label className="form-label" for="zip-code">
                                Zip Code
                            </Label>
                            <Input
                                value={state.zipCode}
                                onChange={(e) =>
                                    setState((p) => ({
                                        ...p,
                                        zipCode: e?.target?.value
                                    }))
                                }
                                id="zip-code"
                                placeholder="99950"
                            />
                        </Col>

                        <Col xs={12}>
                            <Label className="form-label" for="country">
                                Country
                            </Label>
                            <Select
                                id="country"
                                isClearable={false}
                                className="react-select"
                                classNamePrefix="select"
                                options={countryOptions}
                                theme={selectThemeColors}
                                defaultValue={countryOptions[0]}
                                onChange={(e) => {
                                    setState((p) => ({
                                        ...p,
                                        country: e.value
                                    }))
                                }}
                            />
                        </Col>

                        <Col className="text-center" xs={12}>
                            <Button
                                className="me-1 mt-2"
                                color="primary"
                                onClick={updateSubmitHandler}
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Submit'}
                            </Button>
                            <Button
                                type="reset"
                                className="mt-2"
                                color="secondary"
                                outline
                                onClick={onDiscard}
                            >
                                Discard
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default memo(BillingAddress)
