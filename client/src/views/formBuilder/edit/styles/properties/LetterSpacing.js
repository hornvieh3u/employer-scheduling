import React from 'react'
import { Input, Label } from 'reactstrap';

export default function LetterSpacing({getSelectedHtmlElement}) {
    const handlestyle = (e, name) => {
        const element = getSelectedHtmlElement();
          element.addStyle({ [name]: e });
      };
  return (
    <>
    <Label>Letter Spacing</Label>
      <Input
        type="select"
        onChange={(e) => {
          handlestyle(e, 'letter-spacing');
        }}
        //getPopupContainer={() => document.getElementById('buttoninput')}
      >
     <option value="normal">Normal</option>
          <option value="1px">1px Spacing</option>
          <option value="2px">2px Spacing</option>
          <option value="3px">3px Spacing</option>
          <option value="-1px">-1px Spacing</option>
      </Input>
    </>
  )
}
