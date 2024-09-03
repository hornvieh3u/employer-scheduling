import React from 'react'
import { Input, Label } from 'reactstrap'

export default function IsSMS({getSelectedHtmlElement}) {
    const getCheckBoxHtmlElement = () => {
        return getSelectedHtmlElement().getChildAt(0).getChildAt(1);
      };
    const handleCheckBoxTextChange = (e) => {
        const element = getCheckBoxHtmlElement();
        let attributes = element.getAttributes();
        attributes.text = e.target.value;
        element.setAttributes(attributes);
        element.components(e.target.value);
      }
  return (
    <>
    <Label>SMS Checkbox</Label>
    <Input type="checkbox" onChange={handleCheckBoxTextChange}/>
    <Label>I Would Like to Receive an SMS Text Alert Before The Event Starts</Label>
    </>
  )
}
