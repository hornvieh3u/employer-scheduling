import React from 'react'
import { Input, Label } from 'reactstrap'

export default function Spacing({getSelectedHtmlElement}) {
    const handleSpaceChange = (e) => {
        const element = getSelectedHtmlElement();
        let attributes = element.getAttributes();
        attributes.space = e.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
        setbulletspace(e.target.value)
        element.addStyle({'gap': e.target.value + 'px'})
      }
    
  return (
    <>
     <Label>Font Size</Label>
      <Input type="range" onChange={handleSpaceChange}  />
      <Input className="countinput p-0"  onChange={handleSpaceChange} />
    </>
  )
}
