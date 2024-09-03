// ** React Imports
import { Fragment, useRef, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';

const Title = ({ stepper, type, eventForm }) => {
  // ** Default Form Values
  const defaultValues = {
    eventTitle: '',
    note: ''
  };

  // ** Event Type
  const [eventType, setEventType] = useState('Public');

  // ** Register Inputs to React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  // ** Next Button Click Handler
  const handleEventTitleFormSubmit = (data) => {
    eventForm.set('title', data.eventTitle);
    eventForm.set('type', eventType);
    eventForm.set('note', data.note);
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Event Title</h5>
        <small className="text-muted">Enter Your Event Title.</small>
      </div>
      <Form onSubmit={handleSubmit(handleEventTitleFormSubmit)}>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="basicInput">
              Event Title
            </Label>
            <Controller
              name="eventTitle"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  placeholder="Enter Event Title"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.eventTitle && (
              <FormText color="danger" id="validation-add-board">
                Please Enter a Valid Event Title
              </FormText>
            )}
          </Col>
          <Col md="12" className="mb-1">
            <Label className="form-label mb-1" for="eventType">
              Event Type
            </Label>
            <div className="d-flex" onChange={(e) => setEventType(e.target.value)}>
              <div className="form-check me-2">
                <Input type="radio" id="ex1-active" name="ex1" value="Public" defaultChecked />
                <Label className="form-check-label" for="ex1-active">
                  Public
                </Label>
              </div>
              <div className="form-check">
                <Input type="radio" name="ex1" value="Private" id="ex1-inactive" />
                <Label className="form-check-label" for="ex1-inactive">
                  Private
                </Label>
              </div>
            </div>
          </Col>
          <Col md="12" className="mb-3">
            <Label className="form-label" for="basicInput">
              Event Description
            </Label>
            <Controller
              name="note"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="textarea"
                  placeholder="Enter event description here"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Title;
