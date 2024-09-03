import React from 'react'
import { Input, Label } from 'reactstrap';

export default function BackgroundColor({getSelectedHtmlElement}) {
    const handleStyle = (e, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: e.target.value });
      };
  return (
    <>
    <Label>Background Color</Label>
        <Input
          className="p-0"
          style={{
            width: 230,
            height: '40px'
          }}
          size="small"
          type="color"
          onChange={(e) => {
            handleStyle(e, 'background');
          }}
        />
    </>
  )
}
