import React from 'react';
import { Input, Label } from 'reactstrap';

export default function Display({ getSelectedHtmlElement }) {
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: e.target.value });
  };
  return (
    <>
      <Label>Inline/Block</Label>
      <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
        onChange={(e) => handlestyle(e, 'display')}
      >
        <option value="block">Display Block</option>
        <option value="inline">Display Inline</option>
      </Input>
    </>
  );
}
