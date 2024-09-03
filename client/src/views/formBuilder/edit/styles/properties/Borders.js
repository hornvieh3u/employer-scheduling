import React from 'react'
import { Input, Label } from 'reactstrap';

const borders = ['inherit', 'none', '1px', '2px', '3px', '4px', '5px', '10px'];

export default function Borders({getSelectedHtmlElement}) {
    const handlestyle2 = (e, name) => {
        const element = getSelectedHtmlElement();
          element.addStyle({ [name]: e.target.value });
      };
  return (
    <>
    <Label>Borders</Label>
      <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={(e) => handlestyle2(e, 'border')}
      >
        {borders.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
      </Input>
    </>
  )
}
