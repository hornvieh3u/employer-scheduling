import React from 'react'
import { Input, Label } from 'reactstrap';

export default function SubText({getSelectedHtmlElement}) {
    const handleTextChange = (e) => {
        const element = getSelectedHtmlElement();
        element.set({ content: e.target.value });
      };
  return (
    <>
    <Label>Sub Text</Label>
      <Input
        value="value for sub text"
        onChange={handleTextChange}
      />
    </>
  )
}
