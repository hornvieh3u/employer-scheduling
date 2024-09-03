import React from 'react'
import { Input, Label } from 'reactstrap'

export default function ExpireAction({getSelectedHtmlElement}) {
    const handleExpireActionChange = (e) => {
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes.expireAction = e.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
      }
  return (
    <>
    <Label>Expire Action</Label>
    <Input type="select" onChange={handleExpireActionChange}>
        <option value="redirect">Redirect To URL</option>
        <option value="hide">Show & Hide Elements</option>
    </Input>
    </>
  )
}
