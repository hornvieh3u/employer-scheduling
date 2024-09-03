import React from 'react'
import { Input, Label } from 'reactstrap';

export default function TextColor({getSelectedHtmlElement}) {
    const handlestyle = (e, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: e.target.value });
      };
  return (
    <>
    <Label>Text color</Label>
      <Input
          className="p-0"
          style={{
            width: 230,
            height: '40px'
          }}
          size="small"
          type="color"
          onChange={(e) => {
            handlestyle(e, 'color');
          }}
        />
    </>
  )
}
