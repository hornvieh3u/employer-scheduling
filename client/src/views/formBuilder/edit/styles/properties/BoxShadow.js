import React from 'react'
import { Input, Label } from 'reactstrap';

export default function BoxShadow({getSelectedHtmlElement}) {
    const handlestyle = (e, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: e.target.value });
      };
  return (
  <>
  <Label>Box Shadow</Label>
      <Input
        type="select"
        onChange={(e) => {
          handlestyle(e, 'box-shadow');
        }}
        //getPopupContainer={() => document.getElementById('buttonAdvance')}
      >
       <option value="none">No Shadow</option>
          <option value="soft_shadow">Soft Shadow</option>
          <option value="mid_shadow">Mid Shadow</option>
          <option value="hard_shadow">Hard Shadow</option>
          <option value="far_shadow">Far Shadow</option>
          <option value="blurry_shadow">Blurry Shadow</option>
          <option value="dark_highlight">Dark with Highlight</option>
          <option value="1_inset_light">Sharp 1px Inset Light</option>
          <option value="1_inner_border">Sharp 1px Inner Border</option>
          <option value="2_inner_border">Sharp 2px Inner Border</option>
          <option value="highlight">Hightlight On Hover Only</option>
      </Input>
  </>
  )
}
