import React from 'react'
import { Input, Label } from 'reactstrap'

export default function BorderType({getSelectedHtmlElement}) {
    const changeBorder = (type, size,) => {
        const element = getSelectedHtmlElement();
       
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
    const handleBorderChange = (value) => {
       
        changeBorder(value, borderSize)
    }
  return (
    <>
    <Label>Radius Edge</Label>
        <Input
          type="select"
          onChange={handleBorderChange}
          //getPopupContainer={() => document.getElementById('buttonAdvance')}
        >
         <option value="none">No Border</option>
            <option value="full">Full Border</option>
            <option value="bottom">Bottom Border</option>
            <option value="top_bottom">Top & Bottom Border</option>
        </Input>
    </>
  )
}
