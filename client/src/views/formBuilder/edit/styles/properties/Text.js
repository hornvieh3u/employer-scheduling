import React from 'react'
import { Input, Label } from 'reactstrap';

export default function Text({getSelectedHtmlElement}) {
    const handleStyle = (e) => {
        const element = getSelectedHtmlElement();
        element.set({ content: e.target.value });
      };
  return (
    <>
    <Label>Button Text</Label>
      <Input
        defaultValue="Click to Sign Up"
        onChange={handleStyle}
      />
    </>
  )
}
