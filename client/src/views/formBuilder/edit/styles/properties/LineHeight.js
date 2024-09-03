import React from 'react'
import { Input, Label } from 'reactstrap'

export default function LineHeight({getSelectedHtmlElement}) {
  return (
    <>
    <Label>Line Height</Label>
      <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
        onChange={handleaddoptionforULorOL}
      >
        <option value="auto">Auto</option>
        <option value="0.7em">0.7em</option>
        <option value="1em">1em</option>
        <option value="1.3em">1.3em</option>
        <option value="1.4em">1.4em</option>
        <option value="1.5em">1.5em</option>
      </Input>
    </>
  )
}
