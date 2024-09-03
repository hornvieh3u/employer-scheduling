import React from 'react'
import { Input, Label } from 'reactstrap'

export default function PlaceHolder({getSelectedHtmlElement}) {
    const handlePhoneFieldBoxTextChange = (e) => {
        const element = getSelectedHtmlElement();
        let attributes = element.getAttributes();
        attributes.placeHolder = e.target.value;
        element.setAttributes(attributes);
        element.addAttributes({ 'placeholder': e.target.value });
    }
  return (
    <>
    <Label>Place Holder</Label>
    <Input type="text" onChange={handlePhoneFieldBoxTextChange}/>
    </>
  )
}
