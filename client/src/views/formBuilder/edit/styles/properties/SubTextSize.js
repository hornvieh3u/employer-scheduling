import React from 'react'
import { Input, Label } from 'reactstrap'

export default function SubTextSize({getSelectedHtmlElement}) {
    const handleStyle = (e) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ 'font-size': e.target.value });
      };
  return (
    <>
    <Label>Sub Text Size</Label>
      <Input type="range" onChange={handleStyle}  />
      <Input className="countinput p-0" onChange={handleStyle} />
    </>
  )
}
