// ** React Imports
import { Fragment, useMemo, useState } from 'react'

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

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { Plus } from 'react-feather'

// ** Card Images
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png'
import amexCC from '@src/assets/images/icons/payments/amex-cc.png'
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png'
import visaCC from '@src/assets/images/icons/payments/visa-cc.png'
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png'
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png'
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png'
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png'

import useMessage from '../../../../../lib/useMessage'
import { RankAddOrUpdateAction, deleteRankAction } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { rankAddNUpdateReset, rankDeleteReset } from '../../store/reducer'
import moment from 'moment'
const cardsObj = {
    jcb: jcbCC,
    uatp: uatpCC,
    visa: visaCC,
    amex: amexCC,
    diners: dinersCC,
    maestro: maestroCC,
    discover: discoverCC,
    mastercard: mastercardCC
}

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

const Certifications = (props) => {
    // ** States
    const [show, setShow] = useState(false)
    const [cardType, setCardType] = useState('')
    const [selected, setSelected] = useState(null)
    const [dueDate, setDueDate] = useState(new Date())

    const { selectedUser } = props
    const { error, success } = useMessage()
    const dispatch = useDispatch()
    const [state, setState] = useState({
        _id: '',
        name: '',
        photo: '',
        createdAt: new Date()
    })

    // ** Hooks
    const selectedCondition = selected !== null

    const openEditModal = (card) => {
        setState(card)
        setSelected(card)
        setShow(true)
    }

    const openAddModal = () => {
        setSelected(null)
        setShow(true)
    }

    // show success message
    // hide modal
    // reset redux state
    const {
        rankAddNUpdate: { success: isSuccess, loading: isLoading }
    } = useSelector((state) => state?.employeeContact)
    useMemo(() => {
        if (isSuccess) {
            if (state._id !== '') {
                success('Update Successfull')
            } else {
                success('Rank Added successfully ')
            }

            setState((p) => ({
                ...p,
                _id: '',
                name: '',
                createdAt: new Date(),
                photo: ''
            }))

            // hdie modal
            setShow((p) => !p)
            // reset redux state
            dispatch(rankAddNUpdateReset())
        }
    }, [isSuccess])

    function onSubmitHandler() {
        const { _id, name, photo, createdAt } = state
        if (name === '') {
            error('Name must not be empty !')
        } else {
            // dispatch
            const form = new FormData()
            form.append('_id', _id)
            form.append('name', name)
            form.append('createdAt', createdAt)
            form.append('file', photo)
            form.append('id', selectedUser?._id)
            dispatch(RankAddOrUpdateAction(form, selectedUser?._id))
        }
    }

    // Delete Cirtificate
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const {
        rankDelete: { success: isDeleteSuccess, loading: isDeleteLoading }
    } = useSelector((state) => state?.employeeContact)
    useMemo(() => {
        if (isDeleteSuccess) {
            success('Rank Deleted successfully ')
            // hdie modal
            setDeleteModal((p) => !p)
            // reset redux state
            dispatch(rankDeleteReset())
        }
    }, [isDeleteSuccess])

    function onDeleteConfirm() {
        dispatch(
            deleteRankAction(
                { _id: deleteId, employeeId: selectedUser?._id },
                selectedUser?._id
            )
        )
    }

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
                        {selectedUser &&
                            selectedUser?.ranks?.map((card, index) => {
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
                                                    style={{
                                                        maxWidth: 110,
                                                        maxHeight: 'auto'
                                                    }}
                                                    src={card.photo}
                                                    alt={card.imgAlt}
                                                    className="mb-1 img-fluid"
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
                                                        onClick={() =>
                                                            openEditModal(card)
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setDeleteModal(true)
                                                            setDeleteId(
                                                                card?._id
                                                            )
                                                        }}
                                                        outline
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                                <span className="mt-2">
                                                    Got Certificate at{' '}
                                                    {moment(
                                                        card.createdAt
                                                    ).format('L')}
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
                // onClosed={onModalClosed}
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
                    <Row tag={Form} className="gy-1 gx-2 mt-75">
                        <Col xs={12}>
                            <div className="mb-1">
                                <Label className="form-label" for="credit-card">
                                    Certificate Name
                                </Label>
                                <Input
                                    id="company"
                                    placeholder="Certified By"
                                    value={state?.name}
                                    onChange={(e) => {
                                        setState((p) => ({
                                            ...p,
                                            name: e?.target?.value
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
                                    value={state?.createdAt}
                                    options={{ dateFormat: 'Y-m-d' }}
                                    onChange={(date) => {
                                        setState((p) => ({
                                            ...p,
                                            createdAt: date[0]
                                        }))
                                    }}
                                />
                            </div>

                            <div className="mb-1">
                                <Label className="form-label" for="credit-card">
                                    Choose Photo
                                </Label>
                                <Input
                                    id="company"
                                    type="file"
                                    placeholder="Certified By"
                                    onChange={(e) => {
                                        setState((p) => ({
                                            ...p,
                                            photo: e?.target?.files[0]
                                        }))
                                    }}
                                />
                            </div>
                        </Col>

                        <Col className="text-center mt-1" xs={12}>
                            <Button
                                onClick={onSubmitHandler}
                                className="mt-1 me-1"
                                color="primary"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Save'}
                            </Button>
                            <Button
                                type="button"
                                onClick={(_) => setShow((p) => !p)}
                                className="mt-1"
                                color="secondary"
                                outline
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            {/* ////////////////////// ////////////////////// //////////////////////
            ////////////////////// ////////////////////// //////////////////////
            ////////////////////// ////////////////////// */}
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
                                className="mt-1 me-1"
                                color="secondary"
                                outline
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={onDeleteConfirm}
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
