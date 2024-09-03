import React from 'react'
import { Input, Label } from 'reactstrap'

const inputTypeArray = [
    {
      key: 'not-set',
      label: 'Not Set'
    },
    {
      key: 'name',
      label: 'Full Name'
    },
    {
      key: 'first_name',
      label: 'First Name'
    },
    {
      key: 'last_name',
      label: 'Last Name'
    },
    {
      key: 'email',
      label: 'Email Address'
    },
    {
      key: 'phone',
      label: 'Phone Number'
    },
    {
      key: 'birthday',
      label: 'BirthDay'
    },
    {
      key: 'address',
      label: 'Address'
    },
    {
      key: 'city',
      label: 'City'
    },
    {
      key: 'state',
      label: 'State'
    },
    {
      key: 'country',
      label: 'Country'
    },
    {
      key: 'zip',
      label: 'Zip'
    },
    {
      key: 'shipping_address',
      label: 'Shipping Address'
    },
    {
      key: 'shipping_state',
      label: 'Shipping State'
    },
    {
      key: 'shipping_country',
      label: 'Shipping Country'
    },
    {
      key: 'shipping_zip',
      label: 'Shipping Zip'
    },
    {
      key: 'vat_number',
      label: 'VAT Number'
    },
    {
      key: 'custom_type',
      label: 'Custom Type'
    }
  ]

export default function InputType({getSelectedHtmlElement}) {
    const handleChangeType = (e) => {
        const element = getSelectedHtmlElement();
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes.type = e.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
        element.addAttributes({ 'type': e.target.value });
      }
  return (
    <>
    <Label>Input Type</Label>
      <Input
        type="select"
        onChange={handleChangeType} 
      >
{inputTypeArray?.map((inputType) => {
            return (
              <option value={inputType.key} key={inputType.key}>
                {inputType.label}
              </option>
            );
          })}
      </Input>
    </>
  )
}
