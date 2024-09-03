import React from 'react';
import { Input, Label } from 'reactstrap';
const dropShadowArray = [5, 10, 20, 30, 40];

export default function Shadow({ getSelectedHtmlElement }) {
    const handlestyle = (event, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: event.taget.value })
    }
  return (
    <>
      <Label>Shadow</Label>
      <Input
        type="select"
        onChange={(e) => { handlestyle(e, "box-shadow") }}
        //getPopupContainer={() => document.getElementById('buttonAdvance')}
      >
        <option value={'0px'}>No Shadow</option>
        {dropShadowArray?.map((size) => {
          return (
            <option value={size + 'px'} key={size}>
              {size}% drop Shadow
            </option>
          );
        })}
        {dropShadowArray?.map((size) => {
          return (
            <option value={-size + 'px'} key={-size}>
              {size}% Inner Shadow
            </option>
          );
        })}
      </Input>
    </>
  );
}
