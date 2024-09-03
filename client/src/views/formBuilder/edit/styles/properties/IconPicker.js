import React from 'react';
import { Input, Label } from 'reactstrap';

export default function IconPicker({ getSelectedHtmlElement }) {
  return (
    <>
      <Label>Icon Picker</Label>
      <Input defaultValue="None" type="icon" />
    </>
  );
}
