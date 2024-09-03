import React from 'react'
import { Input, Label } from 'reactstrap';
import FontFamily from '../../configuration/fontfamily';

export default function Font({getSelectedHtmlElement}) {
    const handlestyle = (e, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: e.target.value });
      };
  return (
    <>
    <Label>Font</Label>
      <Input
        type="select"
        // showSearch
        //getPopupContainer={() => document.getElementById('button')}
        // filterOption={(input, option) =>
        //   option.children.toLowerCase().includes(input.toLowerCase())
        // }
        onChange={(e) => {
          handlestyle(e, 'font-family');
        }}
      >
        {FontFamily.families.map((item, i) => {
          return (
            <option value={item} key={i}>
              {item}
            </option>
          );
        })}
      </Input>
    </>
  )
}
