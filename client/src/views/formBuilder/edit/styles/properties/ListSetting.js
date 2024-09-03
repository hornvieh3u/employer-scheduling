import React from 'react'
import { Input, Label } from 'reactstrap';

export default function ListSetting({getSelectedHtmlElement}) {
    //set input style
  return (
    <>
    <Label>Text Transform</Label>
      <Input
        type="select"
        onChange={(e) => { handleinputstyle(e, "type") }}
        //getPopupContainer={() => document.getElementById('buttoninput')}
      >
     <option value="Not set">Not set</option>
          <option value="All Countries">All Countries</option>
          <option value="All United State">All United State</option>
          <option value="All Canadian Provinces">All Canadian Provinces</option>
          <option value="Us & Canada">Us & Canada</option>
          <option value="Custom Option">Custom Option</option>
      </Input>
    </>
  )
}
