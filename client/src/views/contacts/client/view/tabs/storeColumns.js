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

import Flatpickr from 'react-flatpickr'
import { toast } from 'react-toastify'

// ** Reactstrap Imports
import moment from 'moment'
// ** Third Party Components
import { Download, Trash, Edit, Send } from 'react-feather'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { editOtherAction, deleteOtherAction } from '../../store/actions'

const EditOther = ({ data }) => {
    const ToastContent = ({ message }) => (
        <>
            <div className="toastify-header">
                <div className="title-wrapper">
                    <h6 className="toast-title fw-bold">{message}</h6>
                </div>
            </div>
        </>
    )

    const {
        contact: { _id }
    } = useSelector((state) => state.clientContact)

    const initialState = {
        address: data.address,
        phone: data.phone,
        startDate: data.startDate,
        endDate: data.endDate,
        _id: data._id,
        clientId: _id
    }

    const [centeredModal, setCenteredModal] = useState(false)
    const [state, setState] = useState(initialState)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleEditOther = () => {
        try {
            dispatch(editOtherAction(state))
            setCenteredModal(false)
            setState(initialState)
            toast.success(<ToastContent message="Other updated successfull" />)
        } catch (err) {
            toast.success(<ToastContent message="Error. Try again" />)
        }
    }

    return (
        <>
            <Edit
                className="text-body cursor-pointer me-1"
                size={17}
                onClick={() => setCenteredModal(true)}
            />

            {centeredModal && (
                <Modal
                    isOpen={centeredModal}
                    toggle={() => setCenteredModal(!centeredModal)}
                    className="modal-dialog-centered"
                >
                    <ModalHeader
                        toggle={() => setCenteredModal(!centeredModal)}
                    >
                        Add New Store
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col sm="12" className="mb-1">
                                <Label
                                    className="form-label"
                                    for="input-default"
                                >
                                    Address
                                </Label>
                                <Input
                                    type="text"
                                    id="input-default"
                                    placeholder="Type full address"
                                    value={state.address}
                                    name="address"
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col sm="12" className="mb-1">
                                <Label
                                    className="form-label"
                                    for="input-default"
                                >
                                    Phone
                                </Label>
                                <Input
                                    type="text"
                                    id="input-default"
                                    placeholder="330-806-1981"
                                    name="phone"
                                    value={state.phone}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col sm="12" className="mb-1">
                                <Label className="form-label" for="inputFile">
                                    Lease Start Date
                                </Label>
                                <Flatpickr
                                    className="form-control"
                                    id="default-picker"
                                    onChange={(date) => {
                                        setState((p) => ({
                                            ...p,
                                            startDate: date[0]
                                        }))
                                    }}
                                    value={state.startDate}
                                    options={{ dateFormat: 'Y-m-d' }}
                                />
                            </Col>
                            <Col sm="12" className="mb-1">
                                <Label className="form-label" for="inputFile">
                                    Lease End Date
                                </Label>
                                <Flatpickr
                                    className="form-control"
                                    id="default-picker"
                                    onChange={(date) => {
                                        setState((p) => ({
                                            ...p,
                                            endDate: date[0]
                                        }))
                                    }}
                                    value={state.endDate}
                                    options={{ dateFormat: 'Y-m-d' }}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={handleEditOther}
                            type="button"
                            className="mt-1 me-1"
                            color="primary"
                        >
                            Save
                        </Button>

                        <Button
                            className="mt-1"
                            color="secondary"
                            outline
                            onClick={() => setCenteredModal(false)}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </>
    )
}

const DeleteOther = ({ data }) => {
    const ToastContent = ({ message }) => (
        <>
            <div className="toastify-header">
                <div className="title-wrapper">
                    <h6 className="toast-title fw-bold">{message}</h6>
                </div>
            </div>
        </>
    )

    const {
        contact: { _id }
    } = useSelector((state) => state.clientContact)

    const dispatch = useDispatch()

    const handleDelete = () => {
        try {
            dispatch(deleteOtherAction({ clientId: _id, _id: data._id }))
            toast.success(<ToastContent message="Other deleted successfull" />)
        } catch (err) {
            toast.success(<ToastContent message="Error. Try again" />)
        }
    }

    return (
        <Trash
            className="text-body cursor-pointer me-1"
            size={17}
            onClick={handleDelete}
        />
    )
}

// ** Table columns
export const storeColumns = [
    {
        name: 'Address',
        sortable: true,
        minWidth: '200px',
        sortField: 'address',
        selector: (row) => row.address,
        cell: (row) => <span>{row.address}</span>
    },
    {
        name: 'Phone',
        sortable: true,
        minWidth: '200px',
        sortField: 'phone',
        selector: (row) => row.phone,
        cell: (row) => <span>{row.phone}</span>
    },
    {
        name: 'Lease Start',
        sortable: true,
        minWidth: '200px',
        sortField: 'startDate',
        selector: (row) => row.startDate,
        cell: (row) => <span>{moment(row.startDate).format('L')}</span>
    },
    {
        name: 'Lease End',
        sortable: true,
        minWidth: '200px',
        sortField: 'endDate',
        selector: (row) => row.endDate,
        cell: (row) => <span>{moment(row.endDate).format('L')}</span>
    },
    {
        name: 'Lease Doc',
        width: '140px',
        center: true,
        cell: (row) => (
            <div className="column-action d-flex align-items-center">
                <a href={row?.file} target="_blank">
                    <Button.Ripple
                        className="btn-icon rounded-circle"
                        outline
                        color="primary"
                    >
                        <Download size={16} />
                    </Button.Ripple>
                </a>
            </div>
        )
    },
    {
        name: 'Action',
        minWidth: '110px',
        cell: (row) => (
            <div className="column-action d-flex align-items-center">
                <EditOther data={row} />
                <DeleteOther data={row} />
                <Send className="text-body cursor-pointer" size={17} />
            </div>
        )
    }
]
