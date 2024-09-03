// ** React Imports
import { useState, Fragment, useMemo, useRef } from 'react'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Form,
    CardBody,
    Button,
    Badge,
    Modal,
    Input,
    Label,
    ModalBody,
    ModalHeader
} from 'reactstrap'

// ** moment
import moment from 'moment'

// ** Icons
import { FiEdit2, FiEye } from 'react-icons/fi'

// ** Third Party Components
// import Swal from 'sweetalert2'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
// import { Check, Briefcase, X } from 'react-feather'
// import { useForm, Controller } from 'react-hook-form'
// import withReactContent from 'sweetalert2-react-content'
import useMessage from '../../../../lib/useMessage'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

import { contactUpdateByIdAction, uploadAvatarAction } from '../store/actions'
import { employeeUpdateIdReset } from '../store/reducer'
import { useDispatch, useSelector } from 'react-redux'

const roleColors = {
    editor: 'light-info',
    admin: 'light-danger',
    author: 'light-warning',
    maintainer: 'light-success',
    subscriber: 'light-primary'
}

const statusColors = {
    active: 'light-success',
    pending: 'light-warning',
    inactive: 'light-secondary'
}

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'pending' }
]

const countryOptions = [
    { value: 'uk', label: 'UK' },
    { value: 'usa', label: 'USA' },
    { value: 'france', label: 'France' },
    { value: 'russia', label: 'Russia' },
    { value: 'canada', label: 'Canada' }
]

const genderoptions = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'transgender', label: 'Transgender' }
]

const clientPosition = [
    { value: 'assitant', label: 'Assistant' },
    { value: 'billing', label: 'Billing' },
    { value: 'salesperson', label: 'Salesperson' }
]

// const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
    // ** State
    const [show, setShow] = useState(false)
    const [centeredModal, setCenteredModal] = useState(false)
    // const [picker, setPicker] = useState(new Date())

    // ** Hook
    const { error, success } = useMessage()

    const photoRef = useRef()
    function onChoosePhoto() {
        photoRef?.current?.click()
    }

    // ** render user img
    const renderUserImg = () => {
        if (selectedUser !== null && selectedUser?.photo !== '') {
            return (
                <div onClick={onChoosePhoto} className="cic-dp cursor-pointer">
                    <img
                        style={{ width: 110, height: 110 }}
                        alt="user-avatar"
                        src={selectedUser?.photo}
                        className="img-fluid rounded mt-3 mb-2"
                    />
                    <div className="cic-photo-edit">
                        <FiEdit2 className="cic-photo-edit-icon" />
                    </div>
                </div>
            )
        } else {
            const stateNum = Math.floor(Math.random() * 6),
                states = [
                    'light-success',
                    'light-danger',
                    'light-warning',
                    'light-info',
                    'light-primary',
                    'light-secondary'
                ],
                color = states[stateNum]
            return (
                <Avatar
                    onClick={onChoosePhoto}
                    initials
                    color={color}
                    className="rounded mt-3 mb-2 cursor-pointer"
                    content={selectedUser.fullName}
                    contentStyles={{
                        borderRadius: 0,
                        fontSize: 'calc(48px)',
                        width: '100%',
                        height: '100%'
                    }}
                    style={{
                        height: '110px',
                        width: '110px'
                    }}
                />
            )
        }
    }

    // state
    const [state, setState] = useState({
        _id: '',
        fullName: '',
        email: '',
        phone: '',
        photo: '',
        gender: '',
        address: null,
        status: '',
        note: '',
        tags: [],
        dob: '',
        type: '',
        salary: 0,
        isFormer: false,
        isinternship: false
    })

    useMemo(() => {
        if (selectedUser) {
            setState(selectedUser)
        }
    }, [selectedUser])

    const dispatch = useDispatch()

    // ** after update
    const {
        contactUpdate: { loading, success: isSucceess }
    } = useSelector((state) => state.employeeContact)

    useMemo(() => {
        if (isSucceess) {
            // show success message
            success('Contact updated successfully')

            // Hide modal
            setShow(false)

            // reset store state
            dispatch(employeeUpdateIdReset())
        }
    }, [isSucceess])

    function onchangeHandler(event) {
        const { name, value } = event.target
        setState((p) => ({ ...p, [name]: value }))
    }

    function submitHandler() {
        dispatch(contactUpdateByIdAction(state))
    }

    function uploadPhoto({ file, id }) {
        const form = new FormData()
        form.append('file', file)
        form.append('id', id)
        dispatch(uploadAvatarAction(form, id))
    }

    return (
        <Fragment>
            {/* upload photo */}
            <input
                type="file"
                onChange={(e) => {
                    uploadPhoto({
                        file: e.target.files[0],
                        id: selectedUser?._id
                    })
                }}
                hidden
                ref={photoRef}
            />

            <Card>
                <CardBody>
                    <div className="user-avatar-section">
                        <div className="d-flex align-items-center flex-column">
                            {renderUserImg()}
                            <div className="d-flex flex-column align-items-center text-center">
                                <div className="user-info">
                                    <h4 className="d-flex">
                                        {selectedUser !== null
                                            ? selectedUser.fullName
                                            : 'Eleanor Aguilar'}
                                        <div className="ms-1">
                                            <FiEye className="cic-eye-icon" />
                                        </div>
                                    </h4>
                                    <div>
                                        <span className="fw-bolder me-25">Status :</span>
                                        {selectedUser !== null ? (
                                            <>
                                                <Badge
                                                    color={
                                                        roleColors[
                                                        selectedUser.role
                                                        ]
                                                    }
                                                    className="text-capitalize me-1"
                                                >
                                                    {selectedUser.role}
                                                </Badge>
                                                <Badge
                                                    className="text-capitalize"
                                                    color={
                                                        statusColors[
                                                        selectedUser.status
                                                        ]
                                                    }
                                                >
                                                    {selectedUser.status}
                                                </Badge>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2"></div>
                    <h4 className="fw-bolder border-bottom pb-50 mb-1">
                        Employee Info
                    </h4>
                    <div className="info-container mb-3">
                        {selectedUser !== null ? (
                            <ul className="list-unstyled">
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Contact:
                                    </span>
                                    <span>{selectedUser?.phone}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Email:
                                    </span>
                                    <span>{selectedUser?.email}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Address:
                                    </span>
                                    <span>
                                        {selectedUser?.address && (
                                            <>
                                                {' '}
                                                {
                                                    selectedUser?.address
                                                        ?.street
                                                }{' '}
                                                {selectedUser?.address?.city}{' '}
                                                {selectedUser?.address?.state}{' '}
                                                {selectedUser?.address?.country}
                                            </>
                                        )}
                                    </span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Start Date:
                                    </span>
                                    <span>

                                    </span>
                                </li>
                            </ul>
                        ) : null}
                    </div>

                    <div className="d-flex justify-content-center pt-2">
                        <Button color="primary" onClick={() => setShow(true)}>
                            Edit
                        </Button>
                        <Button
                            className="ms-1"
                            color="primary"
                            outline
                            onClick={() => setCenteredModal(!centeredModal)}
                        >
                            Details
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* Employee Edit Modal */}
            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                className="modal-dialog-centered modal-lg"
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setShow(!show)}
                ></ModalHeader>
                <ModalBody className="px-sm-5 pt-50 pb-5">
                    <div className="text-center mb-2">
                        <h1 className="mb-1">Edit Employee Information</h1>
                    </div>
                    <Form>
                        <Row className="gy-1 pt-75">
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="fullname">
                                    Full Name
                                </Label>
                                <Input
                                    value={state?.fullName}
                                    placeholder="Karena Courtliff"
                                    name="fullName"
                                    // invalid={errors.firstName && true}
                                    onChange={onchangeHandler}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="gender">
                                    Gender
                                </Label>
                                <Select
                                    name="gender"
                                    id="gender"
                                    isClearable={false}
                                    className="react-select"
                                    classNamePrefix="select"
                                    // value={}
                                    options={genderoptions}
                                    theme={selectThemeColors}
                                    defaultValue={genderoptions[0]}
                                    onChange={(_) =>
                                        onchangeHandler({
                                            target: {
                                                name: 'gender',
                                                value: _?.value
                                            }
                                        })
                                    }
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="firstName">
                                    DOB
                                </Label>
                                <Flatpickr
                                    className="form-control"
                                    value={new Date(state.dob)}
                                    onChange={(date) => {
                                        // console.log('data',date)
                                        onchangeHandler({
                                            target: {
                                                name: 'dob',
                                                value: new Date(date)
                                            }
                                        })
                                    }}
                                    id="default-picker"
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="salary">
                                    Salary
                                </Label>

                                <Input
                                    value={state?.salary}
                                    id="salary"
                                    placeholder="00"
                                    name="salary"
                                    onChange={onchangeHandler}
                                    type="number"
                                // invalid={errors.firstName && true}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="city">
                                    City
                                </Label>

                                <Input
                                    value={state?.address?.city}
                                    id="city"
                                    placeholder="Houston"
                                    // invalid={errors.firstName && true}
                                    onChange={(e) => {
                                        setState((p) => ({
                                            ...p,
                                            address: {
                                                ...p.address,
                                                city: e?.target?.value
                                            }
                                        }))
                                    }}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="street">
                                    Street
                                </Label>

                                <Input
                                    value={state?.address?.street}
                                    id="street"
                                    placeholder="2193 Poe Road, Houston"
                                    // invalid={errors.firstName && true}
                                    onChange={(e) => {
                                        setState((p) => ({
                                            ...p,
                                            address: {
                                                ...p.address,
                                                street: e?.target?.value
                                            }
                                        }))
                                    }}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="state">
                                    State
                                </Label>

                                <Input
                                    value={state?.address?.state}
                                    id="state"
                                    placeholder="Texas"
                                    // invalid={errors.firstName && true}
                                    onChange={(e) => {
                                        setState((p) => ({
                                            ...p,
                                            address: {
                                                ...p.address,
                                                state: e?.target?.value
                                            }
                                        }))
                                    }}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="zip">
                                    Zip Code
                                </Label>

                                <Input
                                    value={state?.address?.zip}
                                    id="zip"
                                    placeholder="77032"
                                    // invalid={errors.firstName && true}
                                    onChange={(e) => {
                                        setState((p) => ({
                                            ...p,
                                            address: {
                                                ...p.address,
                                                zip: e?.target?.value
                                            }
                                        }))
                                    }}
                                />
                            </Col>
                            <Col md={6} xs={12}>
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
                                    defaultValue={countryOptions[1]}
                                    onChange={(e) => {
                                        setState((p) => ({
                                            ...p,
                                            address: {
                                                ...p.address,
                                                country: e.value
                                            }
                                        }))
                                    }}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="contact">
                                    Phone
                                </Label>
                                <Input
                                    id="contact"
                                    defaultValue={state?.phone}
                                    placeholder="+1 609 933 4422"
                                    name="phone"
                                    onChange={onchangeHandler}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label
                                    className="form-label"
                                    for="billing-email"
                                >
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    id="billing-email"
                                    defaultValue={state?.email}
                                    placeholder="example@domain.com"
                                    name="email"
                                    onChange={onchangeHandler}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label
                                    className="form-label"
                                    for="billing-email"
                                >
                                    Note
                                </Label>
                                <Input
                                    value={state?.note}
                                    type="note"
                                    id="note"
                                    placeholder="A one liner note"
                                    onChange={onchangeHandler}
                                    name="note"
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="status">
                                    Status:
                                </Label>
                                <Select
                                    id="status"
                                    isClearable={false}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={statusOptions}
                                    theme={selectThemeColors}
                                    defaultValue={
                                        statusOptions[
                                        statusOptions.findIndex(
                                            (i) =>
                                                i.value ===
                                                selectedUser.status
                                        )
                                        ]
                                    }
                                    onChange={(_) =>
                                        onchangeHandler({
                                            target: {
                                                name: 'status',
                                                value: _?.value
                                            }
                                        })
                                    }
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="firstName">
                                    Position
                                </Label>
                                <Select
                                    id="employeePosition"
                                    isClearable={false}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={clientPosition}
                                    theme={selectThemeColors}
                                    defaultValue={clientPosition[0]}
                                    onChange={(_) =>
                                        onchangeHandler({
                                            target: {
                                                name: 'position',
                                                value: _?.value
                                            }
                                        })
                                    }
                                />
                            </Col>

                            <Col xs={12} className="text-center mt-2 pt-50">
                                <Button
                                    // type="submit"
                                    onClick={submitHandler}
                                    className="me-1"
                                    color="primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Submit'}
                                </Button>
                                <Button
                                    type="reset"
                                    color="secondary"
                                    outline
                                    onClick={() => {
                                        setShow(false)
                                    }}
                                >
                                    Discard
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>

            {/* Employee Details Modal */}
            <div className="vertically-centered-modal">
                <Modal
                    isOpen={centeredModal}
                    toggle={() => setCenteredModal(!centeredModal)}
                    className="modal-dialog-centered"
                >
                    <ModalHeader
                        toggle={() => setCenteredModal(!centeredModal)}
                    >
                        Employee Information
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <Row>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Full Name
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {selectedUser?.fullName}
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Status
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {selectedUser?.status}
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Gender
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {selectedUser?.gender}
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        DOB
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {moment(selectedUser?.dob).format('L')}
                                    </p>
                                </Col>

                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Phone
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {selectedUser?.phone}
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Email
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {selectedUser?.email}
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Street
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        2193 Poe Road
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        City
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {selectedUser?.address?.city}
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        State
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {selectedUser?.address?.state}
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        ZIP Code
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {selectedUser?.address?.zip}
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Country
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {selectedUser?.address?.country}
                                    </p>
                                </Col>

                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Note
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {selectedUser?.note}
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </Fragment>
    )
}

export default UserInfoCard
