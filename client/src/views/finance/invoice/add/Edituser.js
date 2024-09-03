/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FormGroup, Label, Input, Button, Form } from 'reactstrap';
import Sidebar from '@components/sidebar';
import Select from 'react-select';
import { selectThemeColors } from '../../../../utility/Utils';
import Flatpickr from 'react-flatpickr';

const roleOptions = [
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Paypal', label: 'Paypal' },
  { value: 'Wire', label: 'Wire' }
];

const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
];

export const Edituser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectPayment, setselectPayment] = useState('');
  const [selectOption, setSelectOption] = useState('');
  const [state, setState] = useState({});
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (value) => {
    setselectPayment(value.value);
  };
  console.log(state);
  return (
    <div>
      <Button className="mb-75" onClick={handleIsOpen} color="primary" block outline>
        Edit settings
      </Button>
      <Sidebar
        size="lg"
        open={isOpen}
        title="Edit"
        headerClassName="mb-1"
        contentClassName="p-0"
        toggleSidebar={handleIsOpen}
      >
        <Form onSubmit={handleSubmit}>
          <div className="mb-1">
            <Label className="fw-bold">Change logo</Label>
            <Input
              onChange={(e) => {
                setState({
                  ...state,
                  [e.target.name]: [e.target.value]
                });
              }}
              placeholder="image"
              name="logo"
              type="file"
            />
          </div>
          <div className="mb-1">
            <Label for="amount" className="form-label">
              Invoice Balance
            </Label>
            <Input id="balance" defaultValue="Invoice Balance: 5000.00" disabled />
          </div>
          <div className="mb-1">
            <Label for="amount" className="form-label">
              Payment Amount
            </Label>
            <Input type="number" id="amount" placeholder="$1000" />
          </div>
          <div className="mb-1">
            <Label for="payment-amount" className="form-label">
              Payment Due
            </Label>
            <Flatpickr id="payment-amount" className="form-control" />
          </div>
          <div className="mb-1">
            <Label for="payment-note" className="form-label">
              Internal Payment Note
            </Label>
            <Input type="textarea" rows="2" id="payment-note" placeholder="Internal Payment Note" />
          </div>
          <div>
            <Label className="fw-bold">Address</Label>
            <Input
              onChange={(e) => {
                setState({
                  ...state,
                  [e.target.name]: [e.target.value]
                });
              }}
              name="address"
              placeholder="Address"
              type="text"
            />
          </div>
          <div>
            <Label className="fw-bold">Phone</Label>
            <Input
              onChange={(e) => {
                setState({
                  ...state,
                  [e.target.name]: [e.target.value]
                });
              }}
              name="phone"
              placeholder="Number"
              type="number"
            />
          </div>
          <div className="border-bottom" />
          <div className="p-1">
            <h5>Edit Payment Details</h5>
          </div>
          <div className="border-bottom mb-1" />
          <div>
            <Label className="fw-bold">Select Payment</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={roleOptions}
              onChange={(data) => handleChange(data)}
            />
          </div>
          {selectPayment === 'Wire' && (
            <>
              <div>
                <Label className="fw-bold">Bank Name</Label>
                <Input name="phone" placeholder="0" type="number" />
              </div>
              <div>
                <Label className="fw-bold">Routing</Label>
                <Input name="phone" placeholder="0" type="number" />
              </div>
              <div>
                <Label className="fw-bold">Account Number</Label>
                <Input name="phone" placeholder="0" type="number" />
              </div>
              <div>
                <Label className="fw-bold">Country</Label>
                <Select
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions}
                />
              </div>
            </>
          )}
          <div className="p-1 border m-1">
            <div className="d-flex justify-content-between mb-1">
              <label className="cursor-pointer mb-0" htmlFor="Remind">
                Remind
              </label>
              <div className="form-switch">
                <Input
                  onChange={(e) => {
                    setSelectOption(e.target.value);
                  }}
                  checked={selectOption === 'Remind'}
                  type="switch"
                  id="payment-terms"
                  value={'Remind'}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button className="m-1" color="primary">
              Save
            </Button>
            <Button className="m-1" outline>
              Cancel
            </Button>
          </div>
        </Form>
      </Sidebar>
    </div>
  );
};
