import React from 'react'
import { Input, Label } from 'reactstrap'

export default function Required({getSelectedHtmlElement}) {
    const handleaddatribute = (e) => {
        const element = getSelectedHtmlElement()
        if (e.target.value === "required") {
            element.addAttributes({ ['required']: true })
        } else {
            element.addAttributes({ ['required']: false })
        }
    }
  return (
    <>
    <Label>Required</Label>
    <Input
        type="select"
        onChange={handleaddatribute}
        //getPopupContainer={() => document.getElementById('buttoninput')}
      >
      <option value="required">Required</option>
          <option value="notRequired">Not Required</option>
          
      </Input>
    </>
  )
}
