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
import moment from 'moment'

// ** Icons
import { FiEdit2, FiEye } from 'react-icons/fi'

// Update Contact Actions
import { updateContactAction, uploadAvatarAction } from '../store/actions'

import { contactUpdateReset } from '../store/reducer'

// ** Third Party Components
// import Swal from 'sweetalert2'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
// import { Check, Briefcase, X } from 'react-feather'
import { useForm } from 'react-hook-form'
// import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useDispatch, useSelector } from 'react-redux'
import useMessage from '../../../../lib/useMessage'

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
    { value: 'pending', label: 'Pending' }
]

const stageOptions = [
    { value: 'cold', label: 'Cold' },
    { value: 'warm', label: 'Warm' },
    { value: 'hot', label: 'Hot' }
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

const leadsTypeptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' }
]

const clientPosition = [
    { value: 'owner', label: 'Owner' },
    { value: 'assitant', label: 'Assistant' },
    { value: 'billing', label: 'Billing' }
]

// const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
    // ** State
    const [show, setShow] = useState(false)
    const [centeredModal, setCenteredModal] = useState(false)
    const [picker, setPicker] = useState(new Date())

    const { success, error } = useMessage()

    // ** Hook
    const {
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: selectedUser.username,
            lastName: selectedUser.fullName.split(' ')[1],
            firstName: selectedUser.fullName.split(' ')[0]
        }
    })

    const photoRef = useRef()
    function onChoosePhoto() {
        photoRef?.current?.click()
    }

    // ** render user img
    const renderUserImg = () => {
        if (selectedUser !== null && selectedUser?.photo) {
            return (
                <div onClick={onChoosePhoto} className="cic-dp">
                    <img
                        height="110"
                        width="110"
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
                    className="rounded mt-3 mb-2"
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

    const onSubmit = (data) => {
        if (Object.values(data).every((field) => field.length > 0)) {
            setShow(false)
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    // redux
    const dispatch = useDispatch()
    const {
        contactUpdate: { success: updateSuccess, loading }
    } = useSelector((state) => state.leadContact)

    useMemo(() => {
        if (updateSuccess) {
            // message
            success('Update Successfull')
            // hide modal
            setShow(!show)
            // dispatch reset
            dispatch(contactUpdateReset())
        }
    }, [dispatch, updateSuccess])

    // Update Contact
    const [state, setState] = useState({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        address: null,
        companyPhone: '',
        companyEmail: '',
        companyAddress: null,
        status: '',
        note: '',
        dob: '',
        tags: '',
        company: '',
        type: '',
        stage: '',
        position: '',
        ranks: ''
    })

    useMemo(() => {
        if (selectedUser) {
            setState(selectedUser)
        }
    }, [selectedUser])

    function updateContactHandler() {
        // updateContactAction
        dispatch(updateContactAction(state))
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

                    <div className="my-2 pt-35"></div>
                    <h4 className="fw-bolder border-bottom pb-50 mb-1">
                        lead Info
                    </h4>
                    <div className="info-container mb-3">
                        {selectedUser !== null ? (
                            <ul className="list-unstyled">
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Contact:
                                    </span>
                                    <span>{state?.phone}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Email:
                                    </span>
                                    <span>{state?.email}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Address:
                                    </span>
                                    <span>
                                        {state?.address?.zipCode}{' '}
                                        {state?.address?.street}{' '}
                                        {state?.address?.city}{' '}
                                        {state?.address?.state}{' '}
                                        {state?.address?.country}{' '}
                                    </span>
                                </li>
                            </ul>
                        ) : null}
                    </div>
                    <h4 className="fw-bolder border-bottom pb-50 mb-1">
                        Company Info
                    </h4>
                    <div className="info-container">
                        {state !== null ? (
                            <ul className="list-unstyled">
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Name:
                                    </span>
                                    <span>{state.company}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Contact:
                                    </span>
                                    <span>{state?.companyPhone}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Email:
                                    </span>
                                    <span>{state?.companyEmail}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Address:
                                    </span>
                                    <span>
                                        {state?.companyAddress?.zipCode}{' '}
                                        {state?.companyAddress?.street}{' '}
                                        {state?.companyAddress?.state}{' '}
                                        {state?.companyAddress?.city}{' '}
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

            {/* Leads Edit Modal */}
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
                        <h1 className="mb-1">Edit Leads Information</h1>
                        <p>
                            Updating leads details will receive a privacy audit.
                        </p>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-1 pt-75">
                            <h4 className="fw-bolder border-bottom pb-50 mb-1">
                                Leads Info
                            </h4>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="fullname">
                                    Full Name
                                </Label>
                                <Input
                                    value={state.fullName}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            fullName: e?.target?.value
                                        }))
                                    }
                                    id="fullname"
                                    placeholder="Karena Courtliff"
                                // invalid={errors.firstName && true}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="gender">
                                    Gender
                                </Label>
                                <Select
                                    onChange={(e) => {
                                        setState((p) => ({
                                            ...p,
                                            gender: e.value
                                        }))
                                    }}
                                    id="gender"
                                    isClearable={false}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={genderoptions}
                                    theme={selectThemeColors}
                                    defaultValue={genderoptions[0]}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="firstName">
                                    DOB
                                </Label>
                                <Flatpickr
                                    className="form-control"
                                    value={picker}
                                    onChange={(date) =>
                                        setState((p) => ({
                                            ...p,
                                            dob: date
                                        }))
                                    }
                                    id="default-picker"
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="firstName">
                                    Leads Type
                                </Label>
                                <Select
                                    id="leadsType"
                                    isClearable={false}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            type: e.value
                                        }))
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={leadsTypeptions}
                                    theme={selectThemeColors}
                                    defaultValue={leadsTypeptions[0]}
                                />
                            </Col>

                            <Col md={6} xs={12}>
                                <Label className="form-label" for="city">
                                    City
                                </Label>

                                <Input
                                    id="city"
                                    placeholder="Houston"
                                    // invalid={errors.firstName && true}
                                    value={state?.address?.city}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            address: {
                                                ...p.address,
                                                city: e?.target?.value
                                            }
                                        }))
                                    }
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="street">
                                    Street
                                </Label>

                                <Input
                                    value={state?.address?.street}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            address: {
                                                ...p.address,
                                                street: e?.target?.value
                                            }
                                        }))
                                    }
                                    id="street"
                                    placeholder="2193 Poe Road, Houston"
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="state">
                                    State
                                </Label>

                                <Input
                                    value={state?.address?.state}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            address: {
                                                ...p.address,
                                                state: e?.target?.value
                                            }
                                        }))
                                    }
                                    id="state"
                                    placeholder="Texas"
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="zip">
                                    Zip Code
                                </Label>

                                <Input
                                    value={state?.address?.zipCode}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            address: {
                                                ...p.address,
                                                zipCode: e?.target?.value
                                            }
                                        }))
                                    }
                                    id="zip"
                                    placeholder="77032"
                                // invalid={errors.firstName && true}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="country">
                                    Country
                                </Label>
                                <Select
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            address: {
                                                ...p.address,
                                                country: e.value
                                            }
                                        }))
                                    }
                                    id="country"
                                    isClearable={false}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={countryOptions}
                                    theme={selectThemeColors}
                                    defaultValue={countryOptions[1]}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="contact">
                                    Phone
                                </Label>
                                <Input
                                    value={state.phone}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            phone: e?.target?.value
                                        }))
                                    }
                                    id="contact"
                                    defaultValue={selectedUser.contact}
                                    placeholder="+1 609 933 4422"
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
                                    value={state.email}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            email: e?.target?.value
                                        }))
                                    }
                                    type="email"
                                    id="billing-email"
                                    defaultValue={selectedUser.email}
                                    placeholder="example@domain.com"
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
                                    value={state.note}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            note: e?.target?.value
                                        }))
                                    }
                                    type="note"
                                    id="note"
                                    placeholder="A one liner note"
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="status">
                                    Status:
                                </Label>
                                <Select
                                    id="status"
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            status: e.value
                                        }))
                                    }
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
                                />
                            </Col>

                            <Col md={6} xs={12}>
                                <Label className="form-label" for="status">
                                    Stage:
                                </Label>
                                <Select
                                    id="Stage"
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            stage: e.value
                                        }))
                                    }
                                    isClearable={false}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={stageOptions}
                                    theme={selectThemeColors}
                                    defaultValue={
                                        stageOptions[
                                        stageOptions.findIndex(
                                            (i) =>
                                                i.value ===
                                                selectedUser.status
                                        )
                                        ]
                                    }
                                />
                            </Col>

                            <h4 className="fw-bolder border-bottom pb-50 mb-1 mt-3">
                                Company Info
                            </h4>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="company">
                                    Company Name
                                </Label>
                                <Input
                                    // {...field}
                                    value={state.company}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            company: e?.target?.value
                                        }))
                                    }
                                    id="company"
                                    placeholder="Binary Bunon"
                                // invalid={errors.firstName && true}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="firstName">
                                    Position
                                </Label>
                                <Select
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            position: e.value
                                        }))
                                    }
                                    id="clientPosition"
                                    isClearable={false}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={clientPosition}
                                    theme={selectThemeColors}
                                    defaultValue={clientPosition[0]}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="street">
                                    Street
                                </Label>

                                <Input
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            companyAddress: {
                                                ...p.companyAddress,
                                                street: e?.target?.value
                                            }
                                        }))
                                    }
                                    value={state?.companyAddress?.street}
                                    id="street"
                                    placeholder="2193 Poe Road, Houston"
                                // invalid={errors.firstName && true}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="city">
                                    City
                                </Label>

                                <Input
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            companyAddress: {
                                                ...p.companyAddress,
                                                city: e?.target?.value
                                            }
                                        }))
                                    }
                                    value={state?.companyAddress?.city}
                                    id="city"
                                    placeholder="Houston"
                                // invalid={errors.firstName && true}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="state">
                                    State
                                </Label>

                                <Input
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            companyAddress: {
                                                ...p.companyAddress,
                                                state: e?.target?.value
                                            }
                                        }))
                                    }
                                    value={state?.companyAddress?.state}
                                    id="state"
                                    placeholder="Texas"
                                // invalid={errors.firstName && true}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="zip">
                                    Zip Code
                                </Label>

                                <Input
                                    value={state?.companyAddress?.zipCode}
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            companyAddress: {
                                                ...p.companyAddress,
                                                zipCode: e?.target?.value
                                            }
                                        }))
                                    }
                                    id="zip"
                                    placeholder="77032"
                                // invalid={errors.firstName && true}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="country">
                                    Country
                                </Label>
                                <Select
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            companyAddress: {
                                                ...p.companyAddress,
                                                country: e?.value
                                            }
                                        }))
                                    }
                                    id="country"
                                    isClearable={false}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={countryOptions}
                                    theme={selectThemeColors}
                                    defaultValue={countryOptions[1]}
                                />
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className="form-label" for="contact">
                                    Phone
                                </Label>
                                <Input
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            companyPhone: e?.target?.value
                                        }))
                                    }
                                    value={state?.companyPhone}
                                    id="contact"
                                    defaultValue={selectedUser.contact}
                                    placeholder="+1 609 933 4422"
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
                                    onChange={(e) =>
                                        setState((p) => ({
                                            ...p,
                                            companyEmail: e?.target?.value
                                        }))
                                    }
                                    type="email"
                                    id="billing-email"
                                    defaultValue={selectedUser.email}
                                    placeholder="example@domain.com"
                                />
                            </Col>

                            <Col xs={12} className="text-center mt-2 pt-50">
                                <Button
                                    // type="submit"
                                    className="me-1"
                                    color="primary"
                                    onClick={updateContactHandler}
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

            {/* User Details Modal */}
            <div className="vertically-centered-modal">
                <Modal
                    isOpen={centeredModal}
                    toggle={() => setCenteredModal(!centeredModal)}
                    className="modal-dialog-centered"
                >
                    <ModalHeader
                        toggle={() => setCenteredModal(!centeredModal)}
                    >
                        Leads Information
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <Row>
                                <h4 className="fw-bolder border-bottom pb-50 mb-1">
                                    Lead Info
                                </h4>
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
                                        {state?.fullName}
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
                                        {state?.stage}
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
                                        {state?.gender}
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
                                        {moment(state?.dob).format('L')}
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Lead Type
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {state?.company}
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
                                        {state?.phone}
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
                                        {state?.email}
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
                                        {state?.address?.street}
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
                                        {state?.address?.city}
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
                                        {state?.address?.state}
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
                                        {state?.address?.zipCode}
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
                                        {state?.country}
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
                                        {state?.note}
                                    </p>
                                </Col>
                                <h4 className="fw-bolder border-bottom pb-50 mb-1">
                                    Company Info
                                </h4>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Company Name
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {state?.company}
                                    </p>
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label
                                        className="form-label"
                                        for="StaticInput"
                                    >
                                        Position
                                    </Label>
                                    <p
                                        className="form-control-static"
                                        id="StaticInput"
                                    >
                                        {state?.position}
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
                                        {state?.companyPhone}
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
                                        {state?.companyEmail}
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
                                        {state?.companyAddress?.street}
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
                                        {state?.companyAddress?.city}
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
                                        {state?.companyAddress?.state}
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
                                        {state?.companyAddress?.zipCode}
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
                                        {state?.companyAddress?.country}
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
