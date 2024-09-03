import React, { useEffect } from 'react';
import 'date-fns';
import {
  Button,
  Col,
  Row,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter
} from 'reactstrap';
import moment from 'moment';

export default function ActivationUpon(props) {
  const { value, templatePayload, setTemplatePayload, dateAndtime } = props;
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    immediately: true,
    days: 1,
    days_type: 'after'
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (value) {
      setState({
        ...state,
        immediately: value?.immediately,
        days: value?.days,
        days_type: value?.days_type
      });
    }
  }, [value]);

  const handleApply = () => {
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ minWidth: 150 }}>
      <Chip
        variant="outlined"
        onClick={handleClickOpen}
        className={classes.styleforChip}
        label={
          <span style={{ widht: '100%' }}>
            {templatePayload.immediately ? (
              'Immediately'
            ) : (
              <>
                {dateAndtime.sent_date ? (
                  <span>
                    {`${moment(dateAndtime.sent_date).format('MM/DD/YYYY')} ${moment(
                      dateAndtime.sent_time
                    ).format('MM/DD/YYYY LT')}`}
                  </span>
                ) : (
                  <span></span>
                )}
              </>
            )}
            <DateRangeIcon color="action"></DateRangeIcon>
          </span>
        }
      ></Chip>
      <Modal
        isOpen={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: '100%' }}
      >
        <form onSubmit={props.handleSubmit}>
          {props.MailIndexType === 0 && (
            <>
              <ModalHeader id="alert-dialog-title" className="pb-0">
                <Typography className="mb-0" style={{ color: '#636363', fontSize: '1.2em' }}>
                  <b>Schedule</b>
                </Typography>
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col sm={12}>
                    <FormGroup
                      className="mt-1"
                      style={{
                        opacity: !templatePayload.immediately ? 0.6 : null
                      }}
                    >
                      <Input
                        onChange={(e) => {
                          setTemplatePayload({
                            ...templatePayload,
                            immediately: !templatePayload.immediately
                          });
                        }}
                        type="checkbox"
                        label="Send immediately (Only for first email in campaign)"
                        id="sendImididately"
                        name="sendImididately"
                        checked={templatePayload?.immediately}
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    sm={12}
                    style={{
                      opacity: templatePayload.immediately ? 0.6 : null
                    }}
                  >
                    <FormGroup className="mt-2">
                      <Input
                        onChange={(e) => {
                          setTemplatePayload({
                            ...templatePayload,
                            immediately: !templatePayload.immediately
                          });
                        }}
                        type="checkbox"
                        label="Add to automated email series"
                        id="sendImididately"
                        name="sendImididately"
                        checked={!templatePayload.immediately}
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    sm={6}
                    md={6}
                    lg={6}
                    style={{
                      opacity: templatePayload.immediately ? 0.6 : null
                    }}
                  >
                    <FormGroup style={{ width: '100%' }}>
                      <span>Pick Date</span>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} className="mt-0">
                        <KeyboardDatePicker
                          margin="normal"
                          style={{
                            borderRadius: '0.4em',
                            border: '1px solid #b8c2cc',
                            height: '2.8em',
                            padding: '5px'
                          }}
                          InputProps={{
                            disableUnderline: true
                          }}
                          id="date-picker-dialog"
                          format="MM/dd/yyyy"
                          value={dateAndtime.sent_date}
                          onChange={(date) => {
                            props.handleDateChange(date, 'sent_date');
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </FormGroup>
                  </Col>
                  <Col
                    sm={6}
                    md={6}
                    lg={6}
                    className="d-flex justify-content-between"
                    style={{
                      opacity: templatePayload.immediately ? 0.6 : null
                    }}
                  >
                    <FormGroup style={{ width: '100%' }}>
                      <span>Pick Time</span>

                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          margin="normal"
                          id="time-picker"
                          style={{
                            borderRadius: '0.4em',
                            border: '1px solid #b8c2cc',
                            height: '2.8em',
                            padding: '5px'
                          }}
                          value={dateAndtime.sent_time}
                          onChange={(date) => {
                            props.handleDateChange(date, 'sent_time');
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change time'
                          }}
                          InputProps={{
                            disableUnderline: true
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
            </>
          )}

          {props.MailIndexType === 1 && (
            <ModalBody>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <span>By Nurturing</span>
                </Col>
                <Col xs={12}>
                  <FormGroup
                    className="mt-1"
                    style={{
                      opacity: !templatePayload.immediately ? 0.6 : null
                    }}
                  >
                    <Input
                      onChange={(e) => {
                        setTemplatePayload({
                          ...templatePayload,
                          immediately: !templatePayload.immediately
                        });
                      }}
                      type="checkbox"
                      label="Send immediately (Only for first email in campaign)"
                      id="sendImididately"
                      name="sendImididately"
                      checked={templatePayload.immediately}
                    />
                  </FormGroup>

                  <div
                    className="d-flex flex-column mt-2"
                    style={{
                      opacity: templatePayload.immediately ? 0.6 : null
                    }}
                  >
                    <FormGroup className="mb-1">
                      <Input
                        onChange={(e) => {
                          setTemplatePayload({
                            ...templatePayload,
                            immediately: !templatePayload.immediately
                          });
                        }}
                        type="checkbox"
                        label="Add to automated email series"
                        id="sendImididately"
                        name="sendImididately"
                        checked={!templatePayload.immediately}
                      />
                    </FormGroup>
                    <div
                      className="d-flex align-items-center"
                      style={{
                        opacity: templatePayload.immediately ? 0.5 : 1,
                        pointerEvents: templatePayload.immediately ? 'none' : 'auto'
                      }}
                    >
                      <FormGroup className="mr-1 d-flex flex-column flex-1">
                        <Label>Enter days</Label>
                        <div
                          className="d-flex align-items-center form-control"
                          style={{ width: 100 }}
                        >
                          <Input
                            type="number"
                            required
                            label={'Enter days'}
                            placeholder="Enter days"
                            defaultValue={0}
                            onChange={(e) => {
                              setTemplatePayload({
                                ...templatePayload,
                                days: e.target.value
                              });
                            }}
                            value={state.days}
                            name="selectinvite"
                            id="selectinvite"
                            style={{
                              minWidth: 50,
                              border: 'none',
                              height: '100%'
                            }}
                          ></Input>
                          <span>days</span>
                        </div>
                      </FormGroup>
                      <FormGroup className="mr-1 d-flex flex-1 flex-column ">
                        <Label>Select One</Label>
                        <Input
                          type="select"
                          required
                          name="selectinvite"
                          id="selectinvite"
                          className=""
                          style={{ width: 100 }}
                          onChange={(e) => {
                            setTemplatePayload({
                              ...templatePayload,
                              days_type: e.target.value
                            });
                          }}
                        >
                          <option selected={state.days_type === 'before'} value="before">
                            Before
                          </option>
                          <option selected={state.days_type === 'after'} value="after">
                            After
                          </option>
                        </Input>
                      </FormGroup>
                      <span className="mr-1 mt-1">previous email at</span>

                      <FormGroup>
                        <Label>Select time below</Label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            style={{
                              borderRadius: '0.4em',
                              border: '1px solid #b8c2cc',
                              height: '2.8em',
                              padding: '5px',
                              margin: '0px',
                              width: 150
                            }}
                            value={dateAndtime.sent_time}
                            onChange={(date) => {
                              props.handleDateChange(date, 'set_time');
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change time'
                            }}
                            InputProps={{
                              disableUnderline: true
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </FormGroup>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          )}

          {props.MailIndexType === 2 && (
            <ModalBody>
              <Row>
                <Col sm={12}>
                  <span>By Criteria Met</span>
                </Col>
                <Col xs={12}>
                  <FormGroup
                    className="mt-1"
                    style={{
                      opacity: !templatePayload.immediately ? 0.6 : null
                    }}
                  >
                    <Input
                      onChange={(e) => {
                        setTemplatePayload({
                          ...templatePayload,
                          immediately: !templatePayload.immediately
                        });
                      }}
                      type="checkbox"
                      label="Send immediately upon entry into system"
                      id="sendImididately"
                      name="sendImididately"
                      checked={templatePayload.immediately}
                    />
                  </FormGroup>

                  <div
                    className="d-flex flex-column mt-2"
                    style={{
                      opacity: templatePayload.immediately ? 0.6 : null
                    }}
                  >
                    <Input
                      onChange={(e) => {
                        setTemplatePayload({
                          ...templatePayload,
                          immediately: !templatePayload.immediately
                        });
                      }}
                      type="checkbox"
                      label="After criteria met send email based on rule below"
                      id="sendImididately"
                      name="sendImididately"
                      className="mb-1"
                      checked={!templatePayload.immediately}
                    />
                    <div
                      className="d-flex align-items-center"
                      style={{
                        pointerEvents: templatePayload.immediately ? 'none' : 'auto'
                      }}
                    >
                      <FormGroup className="d-flex flex-column flex-1">
                        <Label>Enter days</Label>
                        <Input
                          type="number"
                          required
                          label={'Enter days'}
                          defaultValue={0}
                          placeholder="days"
                          name="selectinvite"
                          id="selectinvite"
                          onChange={(e) => {
                            setTemplatePayload({
                              ...templatePayload,
                              days: e.target.value
                            });
                          }}
                          value={state.days}
                          style={{ width: 100, textAlign: 'center' }}
                        ></Input>
                      </FormGroup>

                      <span className="d-flex flex-1 mx-2 pt-1" style={{ fontSize: 12 }}>
                        days{' '}
                      </span>

                      <FormGroup className="mr-1 d-flex flex-1 flex-column ">
                        <Label>Select One</Label>
                        <Input
                          type="select"
                          required
                          name="selectinvite"
                          id="selectinvite"
                          className=""
                          onChange={(e) => {
                            setTemplatePayload({
                              ...templatePayload,
                              days_type: e.target.value
                            });
                          }}
                          style={{ width: 100 }}
                        >
                          <option selected={state.days_type === 'before'} value="before">
                            Before
                          </option>
                          <option selected={state.days_type === 'after'} value="after">
                            After
                          </option>
                        </Input>
                      </FormGroup>

                      <span className="d-flex flex-1 mx-2 pt-1" style={{ fontSize: 12 }}>
                        criteria is met on
                      </span>

                      <FormGroup>
                        <Label>Select time</Label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            style={{
                              borderRadius: '0.4em',
                              border: '1px solid #b8c2cc',
                              height: '2.8em',
                              padding: '5px',
                              margin: '0px',
                              width: 130,
                              textAlign: 'center'
                            }}
                            value={dateAndtime.sent_time}
                            onChange={(date) => {
                              props.handleDateChange(date, 'sent_time');
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change time'
                            }}
                            InputProps={{
                              disableUnderline: true
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </FormGroup>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          )}
        </form>

        <ModalFooter>
          <Button outline onClick={handleClose} color="secondary">
            Cancel
          </Button>

          <Button onClick={handleApply} color="primary" type="submit">
            Apply
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
