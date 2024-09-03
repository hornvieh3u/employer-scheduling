import React from 'react'
import { Input, Label } from 'reactstrap';

export default function ImageSource({getSelectedHtmlElement}) {
    const handleSrcChange = (event) => {
        const element = getSelectedHtmlElement();
        let attributes = element.getAttributes();
        attributes.src = event.target.value;
        element.setAttributes(attributes);
        element.src = event.target.value;
    }
    const handleAltText = (event) => {
        const element = getSelectedHtmlElement();
        let attributes = element.getAttributes();
        attributes.alt = event.target.value;
        element.setAttributes(attributes);
        element.alt = event.target.value;
      }
  return (
    <>
    <Label>Background Image</Label>
      <Input
        className="p-0"
        style={{
          width: 230,
          height: '40px'
        }}
        size="small"
        type="file"
        onChange={handleSrcChange} // get url
      />
      <Label>Alt Text</Label>
      <Input type='text' onChange={handleAltText}/>
    </>
  )
}
