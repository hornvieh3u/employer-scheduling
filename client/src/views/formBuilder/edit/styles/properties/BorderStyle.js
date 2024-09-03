import React from 'react'
import { Input, Label } from 'reactstrap'

export default function BorderStyle({getSelectedHtmlElement}) {
    const changeBorder = (type, style, size,) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ 'border-style': style, })
        switch (type) {
            case 'none':
                element.addStyle({ 'border-width': 0 })
                break;
            case 'full':
                element.addStyle({ 'border-width': size })
                break;
            case 'bottom':
                element.addStyle({ 'border-width': 0 })
                element.addStyle({ 'border-bottom': size })
                break;
            case 'top':
                element.addStyle({ 'border-width': 0 })
                element.addStyle({ 'border-top': size })
                break;
            case 'top_bottom':
                element.addStyle({ 'border-width': 0 })
                element.addStyle({ 'border-top': size })
                element.addStyle({ 'border-bottom': size })
                break;
        }
    }

    const handleBorderStyleChange = (e) => {
        changeBorder(e.target.value)
    }

  return (
    <>
    <Label>Button Align</Label>
    <Input
      type="select"
      onChange={handleBorderStyleChange}
      getPopupContainer={() => document.getElementById('buttoninput')}
    >
      <option value="none">No Border Style</option>
      <option value="solid">Solid</option>
      <option value="dotted">Dotted</option>
    </Input>
  </>
  )
}
