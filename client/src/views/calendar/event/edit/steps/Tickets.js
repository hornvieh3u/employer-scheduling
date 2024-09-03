// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent, setErrors } from '../../store';

// ** Message Imports
import useMessage from '../../../../../lib/useMessage';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';

const Tickets = ({ stepper, type, eventForm, eventInfo }) => {
  // ** Default Form Values
  const defaultValues = {
    ticketName: eventInfo.ticketName
  };

  // ** Register Inputs to React Hook Form
  const {
    reset,
    register,
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues });

  // ** State
  const [ticketType, setTicketType] = useState('');
  const [ticketAvailableQuantity, setTicketAvailableQuantity] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);

  // ** Set values with defined values
  useEffect(() => {
    setValue('ticketName', eventInfo.ticketName);
    setTicketType(eventInfo.ticketType);
    setTicketAvailableQuantity(eventInfo.ticketAvailableQuantity);
    setTicketPrice(eventInfo.ticketPrice);
  }, [eventInfo]);

  const [pastStep, setPastStep] = useState(0);
  // ** History var
  const history = useHistory();
  const { error, success } = useMessage();

  // // ** Message Vars
  // const { success, error } = useMessage()

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.event);

  // ** Event handlers
  const isNumeric = (str) => {
    if (typeof str != 'string') return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  };

  const handleNumberChange = (value, type) => {
    if (isNumeric(value)) {
      if (type === 'Price') {
        setTicketPrice(parseFloat(value));
      } else if (type === 'Quantity') {
        setTicketAvailableQuantity(parseInt(value));
      }
    }
  };

  const handleTicketTypeChange = (value) => {
    setTicketType(value);
    if (value === 'Free') setTicketPrice(0);
    setError('ticketPrice', { type: 'manual', message: '' });
  };

  const handlePastStepHandler = () => {
    stepper.to(pastStep);
  };

  const handleEditClickHandler = (data) => {
    if (ticketType == 'Paid' && ticketPrice == 0) {
      setError('ticketPrice', { type: 'manual', message: 'Ticket Price Should be Set' });
    } else {
      eventForm.set('ticketName', data.ticketName);
      eventForm.set('ticketType', ticketType);
      eventForm.set('ticketAvailableQuantity', ticketAvailableQuantity);
      eventForm.set('ticketPrice', ticketPrice);

      dispatch(updateEvent({ _id: eventInfo._id, eventForm: eventForm }));
      success('Update event successfully');
      history.push('/events');
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Tickets</h5>
        <small>Lets Create Tickets</small>
      </div>
      <Form onSubmit={handleSubmit(handleEditClickHandler)}>
        <Row>
          <Col md="12" className="mb-1 mt-1">
            <Label className="form-label mb-1" for="eventType">
              Ticket Type
            </Label>
            <div className="d-flex" onChange={(e) => handleTicketTypeChange(e.target.value)}>
              <div className="form-check me-2">
                <Input type="radio" id="ex1-active" name="ex1" value="Paid" defaultChecked />
                <Label className="form-check-label" for="ex1-active">
                  Paid
                </Label>
              </div>
              <div className="form-check">
                <Input type="radio" name="ex1" id="ex1-inactive" value="Free" />
                <Label className="form-check-label" for="ex1-inactive">
                  Free
                </Label>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Name
            </Label>
            <Controller
              name="ticketName"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  placeholder="Give your tickets a name ..."
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.ticketName && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Ticket Name
              </FormText>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Available Quantity
            </Label>
            <Input
              type="quantity"
              id="basicInput"
              placeholder="How many tickets are available?"
              value={ticketAvailableQuantity}
              onChange={(e) => handleNumberChange(e.target.value, 'Quantity')}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Price
            </Label>
            <Input
              type="number"
              step="any"
              id="basicInput"
              placeholder="Price per ticket"
              value={ticketPrice}
              disabled={ticketType === 'Free'}
              {...register('ticketPrice')}
              onChange={(e) => handleNumberChange(e.target.value, 'Price')}
            />
            {errors.ticketPrice && (
              <FormText color="danger" id="validation-add-board">
                {errors.ticketPrice.message}
              </FormText>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Register Form
            </Label>
            <Input
              type="select"
              id="registerForm"
              name="registerForm">
              <option value="1">Form 1</option>
              <option value="2">Form 2</option>
              <option value="3">Form 3</option>
              <option value="4">Form 4</option>
            </Input>
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Update</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
      {errors.previous && (
        <FormText color="danger" id="validation-add-board">
          You did not enter the required values in the{' '}
          <Link onClick={handlePastStepHandler} style={{ textDecoration: 'underline' }}>
            past steps
          </Link>
          .
        </FormText>
      )}
    </Fragment>
  );
};

export default Tickets;
