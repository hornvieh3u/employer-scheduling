import React from 'react'
import { Input, Label } from 'reactstrap';

export default function IconPosition({getSelectedHtmlElement}) {
    const handlestyle = (e) => {
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes.iconPosition = e.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
      }
  return (
    <>
     <Label>Icon Position</Label>
      <Input
        type="select"
        onChange={handlestyle}
        //getPopupContainer={() => document.getElementById('buttoninput')}
      >
     
          <option value="right">Right</option>
          <option value="left">Left</option>
          
      </Input>
    </>
  )
}
