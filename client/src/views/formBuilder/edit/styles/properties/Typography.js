import React from 'react'
import { Input, Label } from 'reactstrap'

export default function Typography({getSelectedHtmlElement}) {
    const handleaddatribute = (e, name) => {
        const element = getSelectedHtmlElement()
        element.addAttributes({ [name]: e })
    }
  return (
   <>
   <Label>Opacity</Label>
    <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
        onChange={(e) => { handleaddatribute(e, "variant") }}
      >
        <option value="h1">Headline</option>
        <option value="p">Content Font</option>
      </Input>
   </>
  )
}
