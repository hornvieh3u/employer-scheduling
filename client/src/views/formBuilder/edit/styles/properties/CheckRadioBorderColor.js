import React from 'react'
import { Input, Label } from 'reactstrap';

export default function CheckRadioBorderColor({getSelectedHtmlElement}) {
    const handlestyle = (e) => {
        const element = getSelectedHtmlElement();
        //GET_BORDER_COLOR_FOR_CHECKBOX(e)
        element.addStyle({ border: `1px solid ${e.target.value}` });
      };
  return (
    <>
      <Label>Border Color</Label>
      <Input
        className="p-0"
        style={{
          width: 240,
          height: '40px'
        }}
        size="small"
        type="color"
        onChange={(e) => {
          handlestyle(e);
        }}
      />
    </>
  )
}
