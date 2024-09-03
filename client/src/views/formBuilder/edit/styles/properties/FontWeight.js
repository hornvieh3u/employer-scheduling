import React from 'react'
import { Input, Label } from 'reactstrap'

export default function FontWeight({getSelectedHtmlElement}) {
    const handlestyle = (newVal, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: newVal })
    }
  return (
    <>
    <Label>Button Align</Label>
    <Input
      type="select"
      onChange={(e) => { handlestyle(e, "font-weight") }}
      getPopupContainer={() => document.getElementById('buttoninput')}
    >
      <option value="bold">Bold</option>
      <option value="normal">Normal</option>
  
    </Input>
  </>
  )
}
