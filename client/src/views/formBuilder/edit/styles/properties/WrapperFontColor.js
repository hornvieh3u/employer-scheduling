import React from 'react'
import { Input, Label } from 'reactstrap'

export default function WrapperFontColor({getWrapper}) {
    const handleFormColor = (e) => {
        getWrapper().setStyle({ 'color': e.target.value });
      };
  return (
    <>
    <Label>Color</Label>
      <Input
        className="p-0"
        style={{
          width: 230,
          height: '40px'
        }}
        size="small"
        type="color"
        onChange={handleFormColor} // get url
      />
    </>
  )
}
