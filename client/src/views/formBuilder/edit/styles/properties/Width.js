import React from 'react'
import { Input, Label } from 'reactstrap'

export default function Width({getSelectedHtmlElement}) {
    const handlestylewidth = (e, value) => {
  
        if (e.target.value === 'fill width') {
          const element = getSelectedHtmlElement();
          element.addStyle({ width: '100%' });
        } else {
          const element = getSelectedHtmlElement();
          element.addStyle({ width: '200px' });
        }
      };
  return (
    <>
    <Label>Width</Label>
    <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
        onChange={(e) => handlestylewidth(e, 'width')}
      >
        <option value="fuild">Fuild</option>
        <option value="fill width">Fill width</option>
      </Input>
    </>
  )
}
