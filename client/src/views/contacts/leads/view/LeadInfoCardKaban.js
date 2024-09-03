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
import { ListGroupItem } from 'reactstrap'

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

const UserInfoCardKaban = ({ selectedUser }) => {
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
            <ListGroupItem
                className="draggable"
                style={{ marginBottom: '5px' }}
            >
                <div className="d-flex align-items-center">
                    <div>
                        <h5 className="mt-0">
                            Name: {selectedUser.fullName}
                        </h5>

                        Company:  {selectedUser.company}
                        <div className="d-flex justify-content-between mt-1">
                            <div className="d-flex">
                                <div className="d-flex flex-column me-3">
                                    <span className="fw-bold">
                                        position
                                    </span>
                                    <span>
                                        {selectedUser.position}
                                    </span>
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="fw-bold">
                                        phone
                                    </span>
                                    <span>
                                        {selectedUser.phone}
                                    </span>
                                </div>
                            </div>

                            <div className="d-flex align-items-end">
                                <Badge
                                    className="text-capitalize ms-1"
                                    color="light-success"
                                    pill
                                >
                                    low
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </ListGroupItem>
        </Fragment>
    )
}

export default UserInfoCardKaban
