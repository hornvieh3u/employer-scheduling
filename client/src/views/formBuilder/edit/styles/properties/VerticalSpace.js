import React from 'react'
import { Input, Label } from 'reactstrap';

const spaces = [
    'inherit',
    '5px',
    '10px',
    '15px',
    '20px',
    '25px',
    '30px',
    '35px',
    '40px',
    '0px'
  ];

export default function VerticalSpace({getSelectedHtmlElement}) {
    const handlestyle = (e, name) => {
      const padding = `0px ${e.target.value} 0px ${e.target.value} `
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: padding });
      };
  return (
    <>
    <Label>Vertical Space</Label>
      <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={(e) => handlestyle(e, 'padding')}
      >
        {spaces.map((item) => {
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
