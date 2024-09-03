import React from 'react'
import { Input, Label } from 'reactstrap';

export default function SectionWidth({getSelectedHtmlElement}) {
    const handleSectionWidthChange = (value) => {
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes.widthType = value;
        getSelectedHtmlElement().setAttributes(attributes);
      }
  return (
    <>
    <Label>Width</Label>
      <Input
        type="select"
        onChange={handleSectionWidthChange}
        //getPopupContainer={() => document.getElementById('buttoninput')}
      >
     <option value="full_page">Full Page</option>
          <option value="wide">Wide</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
      </Input>
    </>
  )
}
