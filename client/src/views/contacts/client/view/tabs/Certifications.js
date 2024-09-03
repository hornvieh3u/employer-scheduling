// ** React Imports
import { Fragment, useEffect, useMemo, useState } from 'react'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Form,
    Modal,
    Label,
    Input,
    Button,
    CardBody,
    CardTitle,
    ModalBody,
    CardHeader,
    ModalHeader
} from 'reactstrap'
import { toast } from 'react-toastify'
// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { Plus } from 'react-feather'

import {
    addRankAction,
    deleteRankAction,
    fetchSingleClientAction,
    editRankAction
} from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useDateFormatter } from '../../../../../hooks/useDateFormatter'
import { useParams } from 'react-router-dom'
import {
    addRankReset,
    editRankReset,
    deleteRankReset
} from '../../store/reducer'

const data = [
    {
        cardCvc: '587',
        name: 'NASM Certification',
        expiryDate: '12/24',
        imgAlt: 'Mastercard',
        badgeColor: 'primary',
        cardStatus: 'Primary',
        cardNumber: '5577 0000 5577 9865',
        imgSrc: require('@src/assets/images/icons/certifications/nasm.png')
            .default
    }
]

const Certifications = ({ selectedUser }) => {
    const ToastContent = ({ message }) => (
        <Fragment>
            <div className="toastify-header">
                <div className="title-wrapper">
                    <h6 className="toast-title fw-bold">{message}</h6>
                </div>
            </div>
        </Fragment>
    )

    const { id } = useParams()

    const value = useSelector((state) => state?.clientContact)
    const {
        singleClient,
        rank: { isSuccess },
        editRank: { isLoading: editLoading, isSuccess: editSuccess },
        deleteRank: { isSuccess: deleteSuccess, isLoading: isDeleteLoading }
    } = value

    const { client } = singleClient ? singleClient : []
    const { ranks } = client ? client : []

    // ** States
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(null)
    // const [dueDate, setDueDate] = useState(new Date())
    const dispatch = useDispatch()
    const [rankEditId, setRankEditId] = useState('')

    const selectedCondition = selected !== null

    const openEditModal = (card) => {
        setSelected(card)
        setShow(true)
    }

    const openAddModal = () => {
        setSelected(null)
        setShow(true)
    }

    const onSubmit = (data) => {
        if (data.cardNumber.length > 0) {
            setShow(show)
        } else {
            if (data.cardNumber.length === 0) {
                setError('cardNumber', {
                    type: 'manual'
                })
            }
        }
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(fetchSingleClientAction(id))

            setShow(false)
            toast.success(<ToastContent message="Rank added successfull" />)
            dispatch(addRankReset())
        }
    }, [isSuccess])

    const onModalClosed = () => {
        // reset()
        setSelected(null)
        setShow(false)
    }

    // Rank add
    const [state, setState] = useState({
        rankName: '',
        _date: new Date(),
        photo: ''
    })

    function handleAddRank() {
        const { rankName, _date, photo } = state

        if (rankName === '') {
            toast.error(
                <ToastContent message="Rank name must not be empty !" />
            )
        } else if (photo === '') {
            toast.error(<ToastContent message="Choose Rank photo !" />)
        } else if (_date === '') {
            toast.error(<ToastContent message="Select Date !" />)
        } else {
            //
            const formData = new FormData()
            formData.append('name', rankName)
            formData.append('file', photo)
            formData.append('clientId', selectedUser?._id)
            formData.append('createdAt', _date)
            formData.append('_id', _date)
            dispatch(addRankAction(formData))
            setSelected(null)
            setState({
                rankName: '',
                _date: new Date(),
                photo: ''
            })
        }
    }

    useMemo(() => {
        if (editSuccess) {
            setSelected(null)
            setShow(false)
            toast.success(<ToastContent message="Rank updated successfull" />)
            setState({
                rankName: '',
                _date: new Date(),
                photo: ''
            })

            // Reset reducer
            dispatch(editRankReset())
        }
    }, [editSuccess])

    const handleEdit = () => {
        const { rankName, _date, photo } = state
        const formData = new FormData()
        formData.append('name', rankName)
        formData.append('file', photo)
        formData.append('clientId', selectedUser?._id)
        formData.append('createdAt', _date)
        formData.append('_id', rankEditId)
        dispatch(editRankAction(formData, selectedUser?._id))
    }

    // Delete
    // Delete Cirtificate
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const handleRankDelete = () => {
        dispatch(deleteRankAction({ clientId: id, rankId: deleteId }))
    }

    useMemo(() => {
        if (deleteSuccess) {
            fetchSingleClientAction(id)
            toast.success(<ToastContent message="Rank deleted successfull !" />)
            dispatch(deleteRankReset())

            // hide modal
            setDeleteModal(false)
        }
    }, [deleteSuccess])

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">Certifications</CardTitle>
                    <Button color="primary" size="sm" onClick={openAddModal}>
                        <Plus className="me-50" size={14} />
                        <span>Add Certificate</span>
                    </Button>
                </CardHeader>
                <CardBody>
                    <div className="added-cards">
                        {ranks &&
                            ranks?.length > 0 &&
                            ranks?.map((card, index) => {
                                const isLastCard = index === data.length - 1
                                return (
                                    <div
                                        key={index}
                                        className={classnames(
                                            'cardMaster rounded border p-2',
                                            {
                                                'mb-1': !isLastCard
                                            }
                                        )}
                                    >
                                        <div className="d-flex justify-content-between flex-sm-row flex-column">
                                            <div className="card-information">
                                                <img
                                                    src={card.photo}
                                                    alt={card.name}
                                                    className="mb-1 img-fluid"
                                                    style={{ width: '150px' }}
                                                />
                                                <div className="d-flex align-items-center mb-50">
                                                    <h6 className="mb-0">
                                                        {card.name}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column text-start text-lg-end">
                                                <div className="d-flex order-sm-0 order-1 mt-1 mt-sm-0">
                                                    <Button
                                                        outline
                                                        color="primary"
                                                        className="me-75"
                                                        onClick={() => {
                                                            openEditModal(card)
                                                            setRankEditId(
                                                                card._id
                                                            )
                                                            setState(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    rankName:
                                                                        card.name,
                                                                    _date: card.createdAt
                                                                })
                                                            )
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        outline
                                                        onClick={() => {
                                                            {
                                                                setDeleteId(
                                                                    card?._id
                                                                )

                                                                setDeleteModal(
                                                                    true
                                                                )
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                                <span className="mt-2">
                                                    Got Certificate at{' '}
                                                    {useDateFormatter(
                                                        card.createdAt
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </CardBody>
            </Card>
            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                className="modal-dialog-centered"
                onClosed={onModalClosed}
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setShow(!show)}
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50 pb-5">
                    <h1 className="text-center mb-1">
                        {selectedCondition ? 'Edit' : 'Add New'} Certificate
                    </h1>
                    <p className="text-center">
                        {selectedCondition
                            ? 'Edit your saved certificate details'
                            : 'Add a new Certification details'}
                    </p>
                    <Row
                        tag={Form}
                        className="gy-1 gx-2 mt-75"
                        onSubmit={onSubmit}
                    >
                        <Col xs={12}>
                            <div className="mb-1">
                                <Label className="form-label" for="credit-card">
                                    Certificate Name
                                </Label>
                                <Input
                                    id="company"
                                    placeholder="Certified By"
                                    value={state.rankName}
                                    onChange={(e) => {
                                        setState((p) => ({
                                            ...p,
                                            rankName: e?.target?.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className="mb-1">
                                <Label className="form-label" for="credit-card">
                                    Got Certificate At
                                </Label>
                                <Flatpickr
                                    id="due-date"
                                    name="due-date"
                                    className="form-control"
                                    onChange={(date) => {
                                        setState((p) => ({
                                            ...p,
                                            _date: date[0]
                                        }))
                                    }}
                                    value={state._date}
                                    options={{ dateFormat: 'Y-m-d' }}
                                />
                            </div>

                            <div className="mb-1">
                                <Label className="form-label" for="credit-card">
                                    Photo
                                </Label>
                                <Input
                                    id="due-date"
                                    name="due-date"
                                    className="form-control"
                                    type="file"
                                    onChange={(e) => {
                                        if (e?.target?.files[0]) {
                                            setState((p) => ({
                                                ...p,
                                                photo: e.target.files[0]
                                            }))
                                        }
                                    }}
                                />
                            </div>
                        </Col>

                        <Col className="text-center mt-1" xs={12}>
                            <Button
                                onClick={
                                    selectedCondition
                                        ? handleEdit
                                        : handleAddRank
                                }
                                type="button"
                                className="mt-1 me-1"
                                color="primary"
                                disabled={value?.rank?.isLoading || editLoading}
                            >
                                {value?.rank?.isLoading || editLoading
                                    ? 'Processing...'
                                    : 'Save'}
                            </Button>
                            <Button
                                className="mt-1"
                                color="secondary"
                                outline
                                onClick={onModalClosed}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>

            {/* /////
            ///// Delete 
            /////
            ///// */}

            <Modal
                isOpen={deleteModal}
                toggle={() => setDeleteModal((p) => !p)}
                className="modal-dialog-centered"
                // onClosed={onModalClosed}
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setDeleteModal((p) => !p)}
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50 pb-5">
                    <h3 className="text-center mb-1">
                        Are you sure to Delete ?
                    </h3>

                    <Row>
                        <Col className="text-center mt-1" xs={12}>
                            <Button
                                onClick={() => setDeleteModal((p) => !p)}
                                className="mt-1 me-1"
                                color="secondary"
                                outline
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    // onDeleteConfirm()
                                    handleRankDelete()
                                }}
                                className="mt-1 "
                                color="primary"
                                disabled={isDeleteLoading}
                            >
                                {isDeleteLoading ? 'Deleting...' : 'confirm'}
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default Certifications
