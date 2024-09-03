// ** React Imports
import { Fragment, useMemo, useState } from 'react';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Modal,
  Badge,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  InputGroup,
  ModalHeader,
  FormFeedback,
  InputGroupText
} from 'reactstrap';

// ** Third Party Components
import classnames from 'classnames';
import Cleave from 'cleave.js/react';
import { Plus, Check, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

// ** Card Images
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png';
import amexCC from '@src/assets/images/icons/payments/amex-cc.png';
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png';
import visaCC from '@src/assets/images/icons/payments/visa-cc.png';
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png';
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png';
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png';
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png';

// ** Actions
import {
  addPaymentMethodAction,
  updatePaymentMethodAction,
  deletePaymentMethodAction,
  updateBillingAddressAction
} from '../../store/actions';

// ** Reducers
import {
  updateBillingAddressReset,
  deletePaymentMethodReset,
  updatePaymentMethodReset,
  addPaymentMethodReset
} from '../../store/reducer';

import useMessage from '../../../../../lib/useMessage';
import { confirm } from 'react-confirm-box';
const cardsObj = {
  jcb: jcbCC,
  uatp: uatpCC,
  visa: visaCC,
  amex: amexCC,
  diners: dinersCC,
  maestro: maestroCC,
  discover: discoverCC,
  mastercard: mastercardCC
};

const data = [
  {
    cardCvc: '587',
    name: 'Tom McBride',
    expiryDate: '12/24',
    imgAlt: 'Mastercard',
    badgeColor: 'primary',
    cardStatus: 'Primary',
    cardNumber: '5577 0000 5577 9865',
    imgSrc: require('@src/assets/images/icons/payments/mastercard.png').default
  },
  {
    cardCvc: '681',
    imgAlt: 'Visa card',
    expiryDate: '02/24',
    name: 'Mildred Wagner',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: require('@src/assets/images/icons/payments/visa.png').default
  },
  {
    cardCvc: '3845',
    expiryDate: '08/20',
    badgeColor: 'error',
    cardStatus: 'Expired',
    name: 'Lester Jennings',
    imgAlt: 'American Express card',
    cardNumber: '3700 000000 00002',
    imgSrc: require('@src/assets/images/icons/payments/american-ex.png').default
  }
];

const cardPic = {
  mastercard:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png',
  visa: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
  amex: 'https://w7.pngwing.com/pngs/662/383/png-transparent-amex-payment-method-icon-thumbnail.png'
};

const PaymentMethods = ({ selectedUser }) => {
  // ** States
  const [show, setShow] = useState(false);
  const [cardType, setCardType] = useState('');
  const [selected, setSelected] = useState(null);

  const selectedCondition = selected !== null;

  const openEditModal = (card) => {
    // setValue('cardNumber', card.cardNumber)
    setSelected(card);
    setShow(true);
  };

  const openAddModal = () => {
    setSelected(null);
    setShow(true);
  };

  const onModalClosed = () => {
    setCardType('');
    setSelected(null);
    setShow(false);
  };

  // state
  const dispatch = useDispatch();
  const onDelete = async (payload) => {
    const result = await confirm('Are you sure?', {
      closeOnOverlayClick: true,
      classNames: 'custom_confirm_box'
    });
    if (result) {
      // store.dispatch(deleteClientContact(id))
      dispatch(deletePaymentMethodAction(payload));
      return;
    }
  };

  const { isSuccess: addSuccess, isLoading: addIsLoading } = useSelector(
    (state) => state?.clientContact?.addPaymentMethod
  );

  const { isSuccess: updateSuccess, isLoading: updateIsLoading } = useSelector(
    (state) => state?.clientContact?.editPaymentMethod
  );

  const [card, setCard] = useState({
    _id: '',
    cardType: '',
    isPrimary: false,
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const { error, success } = useMessage();

  function addCardHandler() {
    const { cardNumber, cardHolder, cvv, expiryDate, _id } = card;
    if (cardNumber === '') {
      error('Card Number is Empty ');
    } else if (cardHolder === '') {
      error('Card holder is Empty ');
    } else if (cvv === '') {
      error('Card CVV is Empty ');
    } else if (expiryDate === '') {
      error('Card Expiry date is Empty ');
    } else {
      if (_id === '') {
        dispatch(
          addPaymentMethodAction({
            ...card,
            clientId: selectedUser._id
          })
        );
      } else {
        dispatch(
          updatePaymentMethodAction({
            ...card,
            clientId: selectedUser._id
          })
        );
      }
    }
  }

  useMemo(() => {
    if (addSuccess) {
      dispatch(addPaymentMethodReset());
      success('New Payment method added');
      onModalClosed();
    }
  }, [addSuccess]);

  useMemo(() => {
    if (updateSuccess) {
      dispatch(updatePaymentMethodReset());
      success('Payment method updated');
      onModalClosed();
      // Reset Form
      setCard((p) => ({
        ...p,
        cardType: '',
        isPrimary: false,
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      }));
    }
  }, [updateSuccess]);

  function detectCardType(number) {
    var re = {
      electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      dankort: /^(5019)\d+$/,
      interpayment: /^(636)\d+$/,
      unionpay: /^(62|88)\d+$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    };

    for (var key in re) {
      if (re[key].test(number)) {
        return key;
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Payment Methods</CardTitle>
          <Button color="primary" size="sm" onClick={openAddModal}>
            <Plus className="me-50" size={14} />
            <span>Add Card</span>
          </Button>
        </CardHeader>
        <CardBody>
          <div className="added-cards">
            {selectedUser?.paymentMethods &&
              selectedUser?.paymentMethods.map((card, index) => {
                const isLastCard = index === data.length - 1;
                return (
                  <div
                    key={index}
                    className={classnames('cardMaster rounded border p-2', {
                      'mb-1': !isLastCard
                    })}
                  >
                    <div className="d-flex justify-content-between flex-sm-row flex-column">
                      <div className="card-information">
                        <img
                          style={{
                            maxWidth: 80,
                            height: 'auto'
                          }}
                          src={cardPic[String(detectCardType(parseInt(card.cardNumber)))]}
                          alt={card?.imgAlt}
                          className="mb-1 img-fluid"
                        />
                        <div className="d-flex align-items-center mb-50">
                          <h6 className="mb-0">{card?.name}</h6>
                          {index === 0 && (
                            <Badge color="light-primary" className="ms-50">
                              Primary
                            </Badge>
                          )}
                        </div>
                        <span className="card-number ">
                          **** **** **** {card.cardNumber.substring(card.cardNumber.length - 4)}
                        </span>
                      </div>
                      <div className="d-flex flex-column text-start text-lg-end">
                        <div className="d-flex order-sm-0 order-1 mt-1 mt-sm-0">
                          <Button
                            outline
                            color="primary"
                            className="me-75"
                            onClick={() => {
                              {
                                openEditModal(card);
                                setCard(card);
                              }
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() =>
                              onDelete({
                                clientId: selectedUser?._id,
                                id: card?._id
                              })
                            }
                            outline
                          >
                            Delete
                          </Button>
                        </div>
                        <span className="mt-2">Card expires at {card.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                );
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
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h1 className="text-center mb-1">{selectedCondition ? 'Edit' : 'Add New'} Card</h1>
          <p className="text-center">
            {selectedCondition ? 'Edit your saved card details' : 'Add card for future billing'}
          </p>
          <Row
            tag={Form}
            className="gy-1 gx-2 mt-75"
            // onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="credit-card">
                Card Number
              </Label>
              <InputGroup className="input-group-merge">
                <Input
                  id="credit-card"
                  placeholder="1356 3215 6548 7898"
                  value={card.cardNumber}
                  onChange={(e) => {
                    setCard((p) => ({
                      ...p,
                      cardNumber: e.target.value
                    }));
                  }}
                />
                {cardType !== '' && cardType !== 'unknown' ? (
                  <InputGroupText className="cursor-pointer p-25">
                    <img height="24" alt="card-type" src={cardsObj[cardType]} />
                  </InputGroupText>
                ) : null}
              </InputGroup>
            </Col>
            <Col md={6}>
              <Label className="form-label" for="card-name">
                Name On Card
              </Label>
              <Input
                value={card.cardHolder}
                onChange={(e) => {
                  setCard((p) => ({
                    ...p,
                    cardHolder: e.target.value
                  }));
                }}
                id="card-name"
                placeholder="John Doe"
                defaultValue={selectedCondition ? selected.name : ''}
              />
            </Col>
            <Col xs={6} md={3}>
              <Label className="form-label" for="exp-date">
                Exp. Date
              </Label>
              <Cleave
                id="exp-date"
                placeholder="MM/YY"
                className="form-control"
                options={{ delimiter: '/', blocks: [2, 2] }}
                value={card.expiryDate}
                onChange={(e) => {
                  setCard((p) => ({
                    ...p,
                    expiryDate: e.target.value
                  }));
                }}
              />
            </Col>
            <Col xs={6} md={3}>
              <Label className="form-label" for="cvv">
                CVV
              </Label>
              <Cleave
                id="cvv"
                placeholder="654"
                className="form-control"
                options={{ blocks: [3] }}
                value={card.cvv}
                onChange={(e) => {
                  setCard((p) => ({
                    ...p,
                    cvv: e.target.value
                  }));
                }}
              />
            </Col>
            <Col xs={12}>
              <div className="d-flex align-items-center">
                <div className="form-switch w-100">
                  <Input defaultChecked type="switch" name="save-card" id="save-card" />
                  <Label className="form-check-label" for="save-card">
                    <span className="switch-icon-left">
                      <Check
                        onChange={(e) =>
                          setCard((p) => ({
                            ...p,
                            isPrimary: e
                          }))
                        }
                        size={14}
                      />
                    </span>
                    <span className="switch-icon-right">
                      <X size={14} />
                    </span>
                  </Label>
                  <Label className="fw-bolder ms-1" for="save-card">
                    Save Card for future billing?
                  </Label>
                </div>
              </div>
            </Col>
            <Col className="text-center mt-1" xs={12}>
              <Button
                onClick={addCardHandler}
                disabled={addIsLoading || updateIsLoading}
                className="mt-1 me-1"
                color="primary"
              >
                {addIsLoading || updateIsLoading ? 'Processing...' : 'Submit'}
              </Button>
              <Button className="mt-1" color="secondary" outline onClick={onModalClosed}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default PaymentMethods;
