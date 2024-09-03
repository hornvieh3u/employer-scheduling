// ** React Imports
import { Fragment, useState } from 'react'

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
import { useForm, Controller } from 'react-hook-form'

// ** Card Images
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png'
import amexCC from '@src/assets/images/icons/payments/amex-cc.png'
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png'
import visaCC from '@src/assets/images/icons/payments/visa-cc.png'
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png'
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png'
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png'
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png'

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
    },
    {
        cardCvc: '681',
        imgAlt: 'Visa card',
        expiryDate: '02/24',
        name: 'CESH Certification',
        cardNumber: '4532 3616 2070 5678',
        imgSrc: require('@src/assets/images/icons/certifications/ceh.png')
            .default
    },
    {
        cardCvc: '3845',
        expiryDate: '08/20',
        badgeColor: 'error',
        cardStatus: 'Expired',
        name: 'CISM Certifications',
        imgAlt: 'American Express card',
        cardNumber: '3700 000000 00002',
        imgSrc: require('@src/assets/images/icons/certifications/cism.png')
            .default
    }
]

const Certifications = () => {
    // ** States
    const [show, setShow] = useState(false)
    const [cardType, setCardType] = useState('')
    const [selected, setSelected] = useState(null)
    const [dueDate, setDueDate] = useState(new Date())

    // ** Hooks
    const {
        reset,
        control,
        setError,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({ cardNumber: '' })

    const selectedCondition = selected !== null

    const openEditModal = (card) => {
        setValue('cardNumber', card.cardNumber)
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

    const onModalClosed = () => {
        reset()
        setCardType('')
        setSelected(null)
        setShow(false)
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
                        {data.map((card, index) => {
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
                                                src={card.imgSrc}
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
                                                <Button outline>Delete</Button>
                                            </div>
                                            <span className="mt-2">
                                                Got Certificate at{' '}
                                                {card.expiryDate}
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
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Col xs={12}>
                            <div className="mb-1">
                                <Label className="form-label" for="credit-card">
                                    Certificate Name
                                </Label>
                                <Controller
                                    name="company"
                                    control={control}
                                    render={() => (
                                        <Input
                                            id="company"
                                            placeholder="Certified By"
                                        />
                                    )}
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
                                    onChange={(date) => setDueDate(date[0])}
                                    value={dueDate}
                                    options={{ dateFormat: 'Y-m-d' }}
                                />
                            </div>
                        </Col>

                        <Col className="text-center mt-1" xs={12}>
                            <Button className="mt-1 me-1" color="primary">
                                Save
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
        </Fragment>
    )
}

export default Certifications
