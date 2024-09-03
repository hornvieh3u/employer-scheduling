import React from 'react'
import { Input, Label } from 'reactstrap'

export default function Height({getSelectedHtmlElement}) {
    const handleSizeChange = (event, name) => {
        const element = getSelectedHtmlElement();
        let attributes = element.getAttributes();
        attributes[name] = event.target.value;
        element.setAttributes(attributes);
        element.addStyle({ [name]: event.target.value + 'px' })
      }
  return (
    <>
       <Label>Height</Label>
   <Input type='text' onChange={handleSizeChange} name="height"/><span>px</span>
    </>
  )
}
