import React from 'react'
import { Input, Label } from 'reactstrap'

export default function FontSize({getSelectedHtmlElement}) {
    const handleFontsize = (e) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ 'font-size': e.target.value });
      };
  return (
    <>
    <Label>Font Size</Label>
      <Input type="range" onChange={handleFontsize}  />
      <Input className="countinput p-0"  onChange={handleFontsize} />
    </>
  )
}
