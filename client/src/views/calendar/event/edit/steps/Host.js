// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Third Party Components
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button, FormText } from 'reactstrap';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';

const Host = ({ stepper, type, eventForm, eventInfo }) => {
  // ** Default Form Value
  const defaultValues = {
    hostName: '',
    hostEmail: '',
    hostMobileNumber: '',
    hostAlternateNumber: ''
  };

  // ** Set values with defined values
  useEffect(() => {
    setValue('hostName', eventInfo.hostName);
    setValue('hostEmail', eventInfo.hostEmail);
    setValue('hostMobileNumber', eventInfo.hostMobileNumber);
    setValue('hostAlternateNumber', eventInfo.hostAlternateNumber);
  }, [eventInfo]);
  // ** Register Inputs to React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues });

  // ** Next Button Click Handler
  const handleHostFormSubmit = (data) => {
    eventForm.set('hostName', data.hostName);
    eventForm.set('hostEmail', data.hostEmail);
    eventForm.set('hostMobileNumber', data.hostMobileNumber);
    eventForm.set('hostAlternateNumber', data.hostAlternateNumber);

    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Host Info</h5>
        <small>Enter Host Info.</small>
      </div>
      <Form onSubmit={handleSubmit(handleHostFormSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Host Name
            </Label>

            <Controller
              name="hostName"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  placeholder="Enter Host Name"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.hostName && (
              <FormText color="danger" id="validation-add-board">
                Please enter a valid Host Name
              </FormText>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Email
            </Label>
            <Controller
              name="hostEmail"
              control={control}
              rules={{
                required: 'Please Enter Email',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format'
                }
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="Enter Email"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.hostEmail && (
              <FormText color="danger" id="validation-add-board">
                {errors.hostEmail.message}
              </FormText>
            )}
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Mobile Number
            </Label>
            <Controller
              name="hostMobileNumber"
              control={control}
              rules={{
                required: 'Please Enter Mobile Number'
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="Enter Mobile Number"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.hostMobileNumber && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Valid Mobile Number
              </FormText>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Alternate Mobile Number
            </Label>
            <Controller
              name="hostAlternateNumber"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="Enter Alternate Mobile Number"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
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

export default Host;
