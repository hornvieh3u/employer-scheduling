import React from 'react';
import { Input, Label } from 'reactstrap';

export default function TextAlign({ getSelectedHtmlElement }) {
    const handlestyle = (e) => {
        const element = getSelectedHtmlElement();
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes.textAlign = e.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
        element.addStyle({ 'text-align': e.target.value })
      }
  return (
    <>
      <Label>Text Aignment</Label>
      <Input
        type="select"
        onChange={handlestyle}
        //getPopupContainer={() => document.getElementById('buttoninput')}
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </Input>
    </>
  );
}
