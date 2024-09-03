import React from 'react'
import { Input, Label } from 'reactstrap';

export default function WrapperInputBackground({getWrapper}) {
    const handleFormColor = (e) => {
        getWrapper().find('').setStyle({'background-color': e.hex})
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
