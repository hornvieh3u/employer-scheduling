import React from 'react';
import { Input, Label } from 'reactstrap';

const paddingArray = [0, 5, 10, 15, 20, 25, 50, 75, 150];
export default function Padding({getSelectedHtmlElement}) {
    const handlestyle = (e, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: e.target.value })
    }
  return (
    <>
      <Label>Padding</Label>
      <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
        onChange={(e) => { handlestyle(e, "padding") }}
      >
        {paddingArray?.map((padding) => {
          return (
            <option value={padding + 'px'} key={padding}>
              {padding} px
            </option>
          );
        })}
      </Input>
    </>
  );
}
