import React from 'react';
import { Input, Label } from 'reactstrap';

export default function Position({ getSelectedHtmlElement }) {
    const handleDisplayChange = (e) => {
        const element = getSelectedHtmlElement();
        //element.style.position = value;
        element.addStyle({ 'position': e.target.value })
      }
  return (
    <>
      <Label>Position</Label>
      <Input
        type="select"
        onChange={handleDisplayChange}
      >
        <option value="initial">None</option>
        <option value="relative">Relative</option>
        <option value="absolute">Absolute</option>
        <option value="fixed">Fixed</option>
      </Input>
    </>
  );
}
