import React from 'react'
import { Input, Label } from 'reactstrap'

export default function WidthPx({getSelectedHtmlElement}) {
    const handleSizeChange = (event, name) => {
        const element = getSelectedHtmlElement();
        let attributes = element.getAttributes();
        attributes[name] = event.target.value;
        element.setAttributes(attributes);
        element.addStyle({ [name]: event.target.value + 'px' })
      }
  return (
    <>
    <Label>Width</Label>
   <Input type='text' onChange={handleSizeChange} name="width"/><span>px</span>
    </>
  )
}
