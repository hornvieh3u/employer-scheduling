import React from 'react'
import { Input, Label } from 'reactstrap';

export default function TextTransform({getSelectedHtmlElement}) {
    const handlestyle = (e, name) => {
        const element = getSelectedHtmlElement();
          element.addStyle({ [name]: e.target.value });
      };
  return (
    <>
    <Label>Text Transform</Label>
      <Input
        type="select"
        onChange={(e) => {
          handlestyle(e, 'text-transform');
        }}
        //getPopupContainer={() => document.getElementById('buttoninput')}
      >
     <option value="normal">Normal</option>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="capitalize">Capitalize</option>
      </Input>
    </>
  )
}
