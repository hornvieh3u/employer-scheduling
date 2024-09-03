import React from 'react';
import { Input, Label } from 'reactstrap';

export default function AlignHorizontal({ getSelectedHtmlElement }) {
    const handlestyle = (e, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ dispaly: 'flex', [name]: e.target.value });
      };
  return (
    <>
      <Label>Button Align</Label>
      <Input
        type="select"
        onChange={(e) => handlestyle(e, 'justify-content')}
        getPopupContainer={() => document.getElementById('buttoninput')}
      >
        <option value="center">Center</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </Input>
    </>
  );
}
