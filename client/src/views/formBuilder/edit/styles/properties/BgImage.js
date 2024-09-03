import React from 'react';
import { Input, Label } from 'reactstrap';

export default function BgImage({ getSelectedHtmlElement }) {
    const handleBackgroundImageChange = (event) => {
        const element = getSelectedHtmlElement();
        //element.style.backgroundImage =  "url('" + event.target.value + "')";
        element.addStyle({ 'background-image': "url('" + event.target.value + "')" })
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
        onChange={handleBackgroundImageChange} // get url
      />
    </>
  );
}
